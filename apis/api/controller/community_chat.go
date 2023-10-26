package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/infrastructure"
	"github.com/redis/go-redis/v9"
	"net/http"
	"time"
)

type CommunityChatController struct {
	CommunityChatUsaCase domain.ChatCommunityUseCase
	Env                  *infrastructure.Env
	Chats                map[string]bool
}

// @Summary Criar um chat em comunidade
// @Schemes
// @Description Criar um chat em comunidade
// @Tags Chat em comunidade
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.CommunityChatRequest	true	"Dados da comunidade"
// @Success	201	{object} domain.CommunityChatResponse "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router /community_chat [post]
func (pu *CommunityChatController) Post(c *gin.Context) {
	var (
		request domain.CommunityChatRequest
		chat    domain.CommunityChat
	)

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	value := c.GetString("x-user-username")

	user, err := pu.CommunityChatUsaCase.GetUserByUsername(c, value)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: "No found user"})
		return
	}

	chat.Admin = user.ID
	chat.Name = request.Name

	code, err := pu.CommunityChatUsaCase.Post(c, chat)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	var contacts []domain.ContactsCommunityChat
	for _, item := range request.Contacts {
		contacts = append(contacts, domain.ContactsCommunityChat{
			Hash:   code,
			IdUser: item,
		})
	}

	err = pu.CommunityChatUsaCase.PostContact(c, contacts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	c.JSON(http.StatusCreated, domain.CommunityChatResponse{Chat: code})
	return
}

// @Summary Solicita acesso a um chat em comunidade
// @Schemes
// @Description Solicita acesso a um chat em comunidade
// @Tags Chat em comunidade
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.AccessChatRequest	true	"Dados da verificação"
// @Success	200	{object} domain.CommunityChatResponseTwoPhase "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router /community_chat/access [post]
func (pu *CommunityChatController) AccessChat(group *gin.RouterGroup, cache *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request domain.AccessChatRequest

		err := c.ShouldBind(&request)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		username := c.GetString("x-user-username")

		_, err = pu.CommunityChatUsaCase.GetChatByUsername(c, request.Chat, username)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		code, err := pu.CommunityChatUsaCase.CreateTokenAccess(c, request.Chat, username, time.Minute*time.Duration(pu.Env.ExpiryCode))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		} else {
			if !pu.Chats[request.Chat] {
				r := infrastructure.NewRoom(request.Chat)
				group.GET("/"+request.Chat, r.ServeHttp(cache))
				go r.Run()
				pu.Chats[request.Chat] = true
			}
			c.JSON(http.StatusOK, domain.CommunityChatResponseTwoPhase{Code: code})
			return
		}
	}
}
