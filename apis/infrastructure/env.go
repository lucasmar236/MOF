package infrastructure

import (
	"github.com/spf13/viper"
	"log"
)

type Env struct {
	HttpPort string `mapstructure:"HTTP_PORT"`
	DbUser   string `mapstructure:"DB_USER"`
	DbPass   string `mapstructure:"DB_PASS"`
	DbHost   string `mapstructure:"DB_HOST"`
	DbName   string `mapstructure:"DB_NAME"`
	DbPort   string `mapstructure:"DB_PORT"`
	Timezone string `mapstructure:"TIMEZONE"`
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
