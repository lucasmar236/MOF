package route

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/infrastructure"
	"gorm.io/gorm"
	"time"
)

func Setup(env *infrastructure.Env, timeout time.Duration, db *gorm.DB, engine *gin.Engine) {
	router := engine.Group("")
	NewUserRouter(env, timeout, db, router)
}
