package route

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/api/controller"
	"github.com/lucasmar236/MOF/infrastructure"
	"github.com/lucasmar236/MOF/repository"
	"github.com/lucasmar236/MOF/usecase"
	"github.com/redis/go-redis/v9"
	gomail "gopkg.in/mail.v2"
	"gorm.io/gorm"
	"time"
)

func NewPrivateChatRouter(env *infrastructure.Env, timeout time.Duration, cache *redis.Client, email *gomail.Dialer,
	db *gorm.DB, groupPrivate *gin.RouterGroup, groupPublic *gin.RouterGroup) {
	pr := repository.NewPrivateChatRepository(db, cache)
	ur := repository.NewUserRepository(db, cache, email)
	sc := &controller.PrivateChatController{PrivateChatUsaCase: usecase.NewPrivateChatUseCase(pr, ur, timeout), Env: env, Chats: make(map[string]bool)}
	groupPrivate.POST("/private_chat", sc.Post)
	groupPrivate.POST("/private_chat/access", sc.AccessChat(groupPublic, cache))
}
