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

func NewChatsRouter(env *infrastructure.Env, timeout time.Duration, cache *redis.Client, email *gomail.Dialer, db *gorm.DB, group *gin.RouterGroup) {
	ctr := repository.NewContactRepository(db)
	ur := repository.NewUserRepository(db, cache, email)
	cc := &controller.ChatsController{
		ContactUseCase: usecase.NewContactUseCase(ctr, ur, timeout),
		Env:            env}
	group.GET("/chats", cc.GetAll)
}
