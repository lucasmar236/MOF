package route

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/infrastructure"
	"github.com/redis/go-redis/v9"
	gomail "gopkg.in/mail.v2"
	"gorm.io/gorm"
	"net/http"
	"time"
)

func Setup(env *infrastructure.Env, timeout time.Duration, cache *redis.Client, email *gomail.Dialer, db *gorm.DB, engine *gin.Engine) {
	engine.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Route not found"})
	})
	engine.NoMethod(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Method not found"})
	})
	router := engine.Group("/api/v1")
	NewUserRouter(env, timeout, cache, email, db, router)
	NewSignupRouter(env, timeout, cache, email, db, router)
	NewLoginRouter(env, timeout, cache, email, db, router)
}
