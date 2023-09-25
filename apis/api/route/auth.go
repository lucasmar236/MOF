package route

import (
	"github.com/lucasmar236/MOF/api/middleware"
	"github.com/lucasmar236/MOF/repository"
	"github.com/lucasmar236/MOF/usecase"
	"github.com/redis/go-redis/v9"
	gomail "gopkg.in/mail.v2"
	"gorm.io/gorm"
	"time"
)

func NewAuthMiddleware(timeout time.Duration, cache *redis.Client, email *gomail.Dialer, db *gorm.DB) *middleware.AuthMiddleware {
	ur := repository.NewUserRepository(db, cache, email)
	return &middleware.AuthMiddleware{LoginUseCase: *usecase.NewLoginUseCase(ur, timeout)}

}
