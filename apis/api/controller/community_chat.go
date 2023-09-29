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

func (pu *CommunityChatController) Post(c *gin.Context) {
	var (
		request domain.CommunityChatRequest
		chat    domain.CommunityChat
	)

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	value := c.GetString("x-user-username")

	user, err := pu.CommunityChatUsaCase.GetUserByUsername(c, value)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "No found user"})
		return
	}

	chat.Admin = user.ID
	chat.Name = request.Name

	code, err := pu.CommunityChatUsaCase.Post(c, chat)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
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
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"chat": code})
	return
}

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
			c.JSON(http.StatusOK, gin.H{"code": code})
			return
		}
	}
}
