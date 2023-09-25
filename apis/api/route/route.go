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
	PublicRouter := engine.Group("/api/v1")
	NewSignupRouter(env, timeout, cache, email, db, PublicRouter)
	NewLoginRouter(env, timeout, cache, email, db, PublicRouter)
	NewForgotRouter(env, timeout, cache, email, db, PublicRouter)

	ProtectRouter := engine.Group("/api/v1")
	ProtectRouter.Use(NewAuthMiddleware(timeout, cache, email, db).Auth(env.SecretKey))
	NewUserRouter(env, timeout, cache, email, db, ProtectRouter)
}
