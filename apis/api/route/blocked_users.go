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

func NewBlockedUsersRouter(env *infrastructure.Env, timeout time.Duration,
	cache *redis.Client, email *gomail.Dialer, db *gorm.DB, groupPrivate *gin.RouterGroup) {
	br := repository.NewBlockedRepository(db)
	ur := repository.NewUserRepository(db, cache, email)
	bc := &controller.BlockedController{BlockedUseCase: usecase.NewBlockedUseCase(br, ur, timeout), Env: env}
	groupPrivate.GET("/blockeds", bc.GetAll)
	groupPrivate.POST("/blockeds", bc.Post)
	groupPrivate.DELETE("/blockeds", bc.Delete)
}
