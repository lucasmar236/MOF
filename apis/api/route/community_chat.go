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

func NewCommunityChatRouter(env *infrastructure.Env, timeout time.Duration, cache *redis.Client, email *gomail.Dialer,
	db *gorm.DB, groupPrivate *gin.RouterGroup, groupPublic *gin.RouterGroup) {
	pr := repository.NewCommunityChatRepository(db, cache)
	ur := repository.NewUserRepository(db, cache, email)
	sc := &controller.CommunityChatController{CommunityChatUsaCase: usecase.NewCommunityChatUseCase(pr, ur, timeout), Env: env, Chats: make(map[string]bool)}
	groupPrivate.POST("/community_chat", sc.Post)
	groupPrivate.POST("/community_chat/access", sc.AccessChat(groupPublic, cache))
}
