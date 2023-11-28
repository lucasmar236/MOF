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

func NewProfileRouter(env *infrastructure.Env, timeout time.Duration, cache *redis.Client, email *gomail.Dialer,
	db *gorm.DB, groupPrivate *gin.RouterGroup, groupPublic *gin.RouterGroup) {
	ur := repository.NewUserRepository(db, cache, email)
	pc := &controller.ProfileController{ProfileUseCase: usecase.NewProfileUseCase(ur, timeout), Env: env}
	groupPrivate.PUT("/user", pc.UpdateUser)
	groupPrivate.DELETE("/delete-account", pc.DeleteUser)
	groupPrivate.GET("/user", pc.GetUser)
}