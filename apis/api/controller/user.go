package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/usecase"
	"net/http"
)

type UserController struct {
	UseCase usecase.UserUseCase
}

func (uc *UserController) GetAll(c *gin.Context) {
	users, err := uc.UseCase.GetAll(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	} else {
		c.JSON(http.StatusOK, gin.H{"users": users})
	}
}
