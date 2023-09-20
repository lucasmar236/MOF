package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/usecase"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type SignupController struct {
	Signup usecase.SignupUseCase
}

func (sc *SignupController) Singup(c *gin.Context) {
	var request domain.SignupRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Message": err.Error()})
		return
	}

	_, err = sc.Signup.GetUserByEmail(c, request.Email)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"Message": "User already exists"})
		return
	}

	encryptedPass, err := bcrypt.GenerateFromPassword(
		[]byte(request.Password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Message": err.Error()})
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

	err = sc.Signup.Post(c, &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Message": err.Error()})
		return
	}

	accessToken, err := sc.Signup.CreateAccessToken(&user, "secret", 1)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Message": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, domain.SignupResponse{AccessToken: accessToken})
}
