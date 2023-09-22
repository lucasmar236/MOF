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

type SignupController struct {
	SignupUseCase usecase.SignupUseCase
	Env           *infrastructure.Env
}

func (sc *SignupController) Signup(c *gin.Context) {
	var request domain.SignupRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	_, err = sc.SignupUseCase.GetUserByEmail(c, request.Email)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"message": "User already exists"})
		return
	}

	_, err = sc.SignupUseCase.GetUserByUsername(c, request.Username)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"message": "User already exists"})
		return
	}

	encryptedPass, err := bcrypt.GenerateFromPassword(
		[]byte(request.Password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	request.Password = string(encryptedPass)

	user := domain.User{
		FirstName:   request.FirstName,
		LastName:    request.LastName,
		Password:    request.Password,
		Email:       request.Email,
		Username:    request.Username,
		NumberPhone: request.NumberPhone,
	}

	err = sc.SignupUseCase.Post(c, &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	expiry := time.Minute * time.Duration(sc.Env.ExpiryCode)
	go func() {
		err := sc.SignupUseCase.CreateTwoPhaseCode(c, sc.Env.EmailFrom, user.Email, expiry)
		if err != nil {
			fmt.Println("Error to send email to ", user.Email)
		}
	}()
	c.JSON(http.StatusOK, gin.H{"message": "E-mail with code verification sent"})
}

func (sc *SignupController) VerifyTwoPhase(c *gin.Context) {
	var request domain.TwoPhaseRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	code, err := sc.SignupUseCase.VerifyTwoPhaseCode(c, request.Code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Code invalid"})
		return
	}

	user, err := sc.SignupUseCase.GetUserByEmail(c, code)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	token, err := sc.SignupUseCase.CreateAccessToken(&user, sc.Env.SecretKey, sc.Env.AccessTime)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, domain.TwoPhaseResponse{AccessToken: token})
}
