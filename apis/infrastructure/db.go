package infrastructure

import (
	"fmt"
	"github.com/lucasmar236/MOF/domain"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

func NewDbConn(env *Env) *gorm.DB {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=%s",
		env.DbHost, env.DbUser, env.DbPass, env.DbName, env.DbPort, env.Timezone,
	)
	db, err := gorm.Open(postgres.Open(dsn))
	if err != nil {
		log.Fatal("Error to start database", err.Error())
	}

	db.AutoMigrate(domain.User{})
	db.AutoMigrate(domain.Contact{})
	db.AutoMigrate(domain.Blocked{})
	db.AutoMigrate(domain.PrivateChat{})
	db.AutoMigrate(domain.CommunityChat{})
	db.AutoMigrate(domain.ContactsCommunityChat{})
	return db
}
