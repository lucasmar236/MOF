package route

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/api/controller"
	"github.com/lucasmar236/MOF/infrastructure"
	"github.com/lucasmar236/MOF/repository"
	"github.com/lucasmar236/MOF/usecase"
	"gorm.io/gorm"
	"time"
)

func NewSignupRouter(env *infrastructure.Env, timeout time.Duration, db *gorm.DB, group *gin.RouterGroup) {
	ur := repository.NewUserRepository(db)
	sc := &controller.SignupController{SignupUseCase: *usecase.NewSignUseCase(ur, timeout), Env: env}
	group.POST("/signup", sc.Signup)
}
