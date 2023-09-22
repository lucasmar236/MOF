package infrastructure

import (
	"github.com/spf13/viper"
	"log"
)

type Env struct {
	HttpPort   string `mapstructure:"HTTP_PORT"`
	DbUser     string `mapstructure:"DB_USER"`
	DbPass     string `mapstructure:"DB_PASS"`
	DbHost     string `mapstructure:"DB_HOST"`
	DbName     string `mapstructure:"DB_NAME"`
	DbPort     string `mapstructure:"DB_PORT"`
	Timezone   string `mapstructure:"TIMEZONE"`
	SecretKey  string `mapstructure:"SECRET_KEY"`
	Timeout    int    `mapstructure:"TIMEOUT"`
	AccessTime int    `mapstructure:"ACCESS_TIME"`
	EmailPort  int    `mapstructure:"EMAIL_PORT"`
	EmailHost  string `mapstructure:"EMAIL_HOST"`
	EmailFrom  string `mapstructure:"EMAIL_FROM"`
	EmailPass  string `mapstructure:"EMAIL_PASS"`
	CacheHost  string `mapstructure:"CACHE_HOST"`
	CachePort  string `mapstructure:"CACHE_PORT"`
	ExpiryCode int    `mapstructure:"EXPIRY_CODE"`
}

func NewEnv() *Env {
	env := Env{}
	viper.SetConfigFile(".env")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatal("Error to read env file: ", err.Error())
	}

	err = viper.Unmarshal(&env)
	if err != nil {
		log.Fatal("Env file can't be loaded: ", err.Error())
	}
	return &env
}
