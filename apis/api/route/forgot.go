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

func NewForgotRouter(env *infrastructure.Env, timeout time.Duration, cache *redis.Client, email *gomail.Dialer, db *gorm.DB, group *gin.RouterGroup) {
	ur := repository.NewUserRepository(db, cache, email)
	fc := &controller.ForgotController{ForgotUseCase: *usecase.NewForgotUseCase(ur, timeout), Env: env}
	group.PUT("/forgot", fc.ForgotPassword)
	group.POST("/forgot/verify", fc.VerifyTwoPhase)
}
