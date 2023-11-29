package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/infrastructure"
	"net/http"
)

type ChatsController struct {
	ChatsUseCase   domain.ChatsUseCase
	ContactUseCase domain.ContactUseCase
	Env            *infrastructure.Env
}

func (cu *ChatsController) GetAll(c *gin.Context) {
	username := c.GetString("x-user-username")

	user, err := cu.ContactUseCase.GetUserByUsername(c, username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}
	all, err := cu.ChatsUseCase.GetAll(c, int64(user.ID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	} else {
		c.JSON(http.StatusCreated, domain.ChatsResponse{Chats: all})
	}
}
