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

func NewContactRouter(env *infrastructure.Env, timeout time.Duration,
	cache *redis.Client, email *gomail.Dialer, db *gorm.DB, groupPrivate *gin.RouterGroup, groupPublic *gin.RouterGroup) {
	cr := repository.NewContactRepository(db)
	ur := repository.NewUserRepository(db, cache, email)
	fc := &controller.ContactController{ContactUseCase: usecase.NewContactUseCase(cr, ur, timeout), Env: env}
	groupPrivate.GET("/user/contacts", fc.GetAll)
	groupPrivate.POST("/user/contacts", fc.Post)
	groupPrivate.DELETE("/user/delete-contact", fc.Delete)
}
