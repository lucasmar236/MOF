package infrastructure

import (
	"github.com/redis/go-redis/v9"
	gomail "gopkg.in/mail.v2"
	"gorm.io/gorm"
)

type Application struct {
	Env   *Env
	DB    *gorm.DB
	Email *gomail.Dialer
	Cache *redis.Client
}

func App() Application {
	app := &Application{}
	app.Env = NewEnv()
	app.DB = NewDbConn(app.Env)
	app.Email = NewDialer(app.Env)
	app.Cache = NewCache(app.Env)
	return *app
}
