package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/infrastructure"
	"github.com/lucasmar236/MOF/usecase"
	"net/http"
)

type UserController struct {
	UserUserCase usecase.UserUseCase
	Env          *infrastructure.Env
}

func (uc *UserController) GetAll(c *gin.Context) {
	users, err := uc.UserUserCase.GetAll(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	} else {
		c.JSON(http.StatusOK, gin.H{"users": users})
	}
}
