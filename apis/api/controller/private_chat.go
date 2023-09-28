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

func (pu *PrivateChatController) Post(c *gin.Context) {
	var (
		request domain.PrivateChatRequest
		chat    domain.PrivateChat
	)

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	chat.Peer2 = request.Contact
	value := c.GetString("x-user-username")

	user, err := pu.PrivateChatUsaCase.GetUserByUsername(c, value)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "No found user"})
		return
	}

	chat.Peer1 = user.ID

	err = pu.PrivateChatUsaCase.Post(c, chat)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	} else {
		c.JSON(http.StatusCreated, gin.H{"message": "chat created"})
		return
	}
}

func (pu *PrivateChatController) AccessChat(group *gin.RouterGroup, cache *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request domain.AccessChatRequest

		err := c.ShouldBind(&request)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		username := c.GetString("x-user-username")

		_, err = pu.PrivateChatUsaCase.GetChatByUsername(c, request.Chat, username)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		code, err := pu.PrivateChatUsaCase.CreateTokenAccess(c, request.Chat, username, time.Minute*time.Duration(pu.Env.ExpiryCode))
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
