package main

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/api/route"
	"github.com/lucasmar236/MOF/infrastructure"
	"log"
	"time"
)

func main() {
	app := infrastructure.App()
	engine := gin.Default()
	timeout := time.Second * time.Duration(app.Env.Timeout)
	route.Setup(app.Env, timeout, app.Cache, app.Email, app.DB, engine)

	err := engine.Run(":" + app.Env.HttpPort)
	if err != nil {
		log.Panicln("Erro to start HTTP server: ", err.Error())
	}
}
