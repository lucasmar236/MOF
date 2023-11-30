package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/api/route"
	"github.com/lucasmar236/MOF/docs"
	"github.com/lucasmar236/MOF/infrastructure"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"log"
	"time"
)

func main() {
	docs.SwaggerInfo.Title = "MOF"
	docs.SwaggerInfo.Description = "Crie e gerencie conversas privadas ou em comunidade"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = "localhost:8080"
	docs.SwaggerInfo.BasePath = "/api/v1"
	app := infrastructure.App()
	engine := gin.Default()
	config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000"} // Adicione a origem do seu aplicativo React aqui
    config.AllowHeaders = append(config.AllowHeaders, "Authorization") // Permita o cabeçalho de autorização
    config.AllowCredentials = true // Permita credenciais (cabeçalho de autorização)
    engine.Use(cors.New(config))

	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	timeout := time.Second * time.Duration(app.Env.Timeout)
	route.Setup(app.Env, timeout, app.Cache, app.Email, app.DB, engine)
	err := engine.Run(":" + app.Env.HttpPort)
	if err != nil {
		log.Panicln("Erro to start HTTP server: ", err.Error())
	}
}
