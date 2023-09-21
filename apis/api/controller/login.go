package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/infrastructure"
	"github.com/lucasmar236/MOF/usecase"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type LoginController struct {
	LoginUseCase usecase.LoginUseCase
	Env          *infrastructure.Env
}

func (lc *LoginController) Login(c *gin.Context) {
	var request domain.LoginRequest
	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Message": err.Error()})
		return
	}

	var user domain.User
	user, err = lc.LoginUseCase.GetUserByEmail(c, request.Login)
	if err != nil {
		user, err = lc.LoginUseCase.GetUserByUsername(c, request.Login)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"Message": "Invalid credentials"})
			return
		}
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)) != nil {
		c.JSON(http.StatusNotFound, gin.H{"Message": "Invalid credentials"})
		return
	}

	accessToken, err := lc.LoginUseCase.CreateAccessToken(&user, lc.Env.SecretKey, lc.Env.AccessTime)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, domain.LoginResponse{AccessToken: accessToken})
}
