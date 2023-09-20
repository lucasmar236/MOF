package route

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/infrastructure"
	"gorm.io/gorm"
	"net/http"
	"time"
)

func Setup(env *infrastructure.Env, timeout time.Duration, db *gorm.DB, engine *gin.Engine) {
	engine.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Route not found"})
	})
	engine.NoMethod(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Method not found"})
	})
	router := engine.Group("/api/v1")
	NewUserRouter(env, timeout, db, router)
	NewSignupRouter(env, timeout, db, router)
}
