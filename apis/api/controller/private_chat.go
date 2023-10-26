package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/infrastructure"
	"github.com/redis/go-redis/v9"
	"net/http"
	"time"
)

type PrivateChatController struct {
	PrivateChatUsaCase domain.ChatPrivateUseCase
	Env                *infrastructure.Env
	Chats              map[string]bool
}

// @Summary Cria um novo chat privado
// @Schemes
// @DescriptionCria um novo chat privado
// @Tags Chat Privado
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.PrivateChatRequest	true	"Dados da convers"
// @Success	201	{object} domain.PrivateChatResponse "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router /private_chat [post]
func (pu *PrivateChatController) Post(c *gin.Context) {
	var (
		request domain.PrivateChatRequest
		chat    domain.PrivateChat
	)

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}
	chat.Peer2 = request.Contact
	value := c.GetString("x-user-username")

	user, err := pu.PrivateChatUsaCase.GetUserByUsername(c, value)

	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: "No found user"})
		return
	}

	chat.Peer1 = user.ID

	code, err := pu.PrivateChatUsaCase.Post(c, chat)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	} else {
		c.JSON(http.StatusCreated, domain.PrivateChatResponse{Chat: code})
		return
	}
}

// @Summary Solicita acesso a um chat chat privado
// @Schemes
// @Description Solicita acesso a um chat chat privado
// @Tags Chat Privado
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.AccessChatRequest	true	"Dados da convers"
// @Success	201	{object} domain.PrivateChatResponseTwoPhase "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router /private_chat/access [post]
func (pu *PrivateChatController) AccessChat(group *gin.RouterGroup, cache *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request domain.AccessChatRequest

		err := c.ShouldBind(&request)
		if err != nil {
			c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
			return
		}

		username := c.GetString("x-user-username")

		_, err = pu.PrivateChatUsaCase.GetChatByUsername(c, request.Chat, username)
		if err != nil {
			c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
			return
		}

		code, err := pu.PrivateChatUsaCase.CreateTokenAccess(c, request.Chat, username, time.Minute*time.Duration(pu.Env.ExpiryCode))
		if err != nil {
			c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
			return
		} else {
			if !pu.Chats[request.Chat] {
				r := infrastructure.NewRoom(request.Chat)
				group.GET("/"+request.Chat, r.ServeHttp(cache))
				go r.Run()
				pu.Chats[request.Chat] = true
			}
			c.JSON(http.StatusOK, domain.PrivateChatResponseTwoPhase{Code: code})
			return
		}
	}
}
