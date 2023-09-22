package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/infrastructure"
	"github.com/lucasmar236/MOF/usecase"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"
)

type LoginController struct {
	LoginUseCase usecase.LoginUseCase
	Env          *infrastructure.Env
}

func (lc *LoginController) Login(c *gin.Context) {
	var request domain.LoginRequest
	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	var user domain.User
	user, err = lc.LoginUseCase.GetUserByEmail(c, request.Login)
	if err != nil {
		user, err = lc.LoginUseCase.GetUserByUsername(c, request.Login)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "Invalid credentials"})
			return
		}
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)) != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Invalid credentials"})
		return
	}

	expiry := time.Minute * time.Duration(lc.Env.ExpiryCode)
	go func() {
		err := lc.LoginUseCase.CreateTwoPhaseCode(c, lc.Env.EmailFrom, user.Email, expiry)
		if err != nil {
			fmt.Println("Error to send email to ", user.Email)
		}
	}()
	c.JSON(http.StatusOK, gin.H{"message": "E-mail with code verification sent"})
}

func (lc *LoginController) VerifyTwoPhase(c *gin.Context) {
	var request domain.TwoPhaseRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	code, err := lc.LoginUseCase.VerifyTwoPhaseCode(c, request.Code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Code invalid"})
		return
	}

	user, err := lc.LoginUseCase.GetUserByEmail(c, code)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	token, err := lc.LoginUseCase.CreateAccessToken(&user, lc.Env.SecretKey, lc.Env.AccessTime)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, domain.TwoPhaseResponse{AccessToken: token})
}
