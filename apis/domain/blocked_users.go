package domain

import (
	"context"
	"gorm.io/gorm"
	"time"
)

type Blocked struct {
	ID        uint           `json:"id,omitempty" gorm:"primaryKey" swaggerignore:"true"`
	IdUser    uint           `db:"id_user" json:"id_user" swaggerignore:"true"`
	IdBlocked uint           `db:"id_blocked" json:"id_blocked"`
	CreatedAt time.Time      `json:"created_at" swaggerignore:"true"`
	UpdatedAt time.Time      `json:"updated_at"  swaggerignore:"true"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"  swaggerignore:"true"`
}

type UserBlockeds struct {
	FirstName   string `db:"first_name" json:"first_name"`
	LastName    string `db:"last_name" json:"last_name"`
	Email       string `db:"email" json:"email"`
	Username    string `db:"username" json:"username"`
	NumberPhone string `db:"number_phone" json:"number_phone"`
}

type BlockedResponse struct {
	Blockeds []UserBlockeds `json:"blockeds"`
}

type BlockedRepository interface {
	Post(c context.Context, blocked *Blocked) error
	GetAll(c context.Context, user string) ([]UserBlockeds, error)
	GetId(c context.Context, user int64, blocked int64) (Blocked, error)
	Delete(c context.Context, blocked *Blocked) error
}

type BlockedUseCase interface {
	Post(c context.Context, blocked *Blocked) error
	GetAll(c context.Context, user string) ([]UserBlockeds, error)
	GetUserById(c context.Context, user int64) (User, error)
	GetUserByUsername(c context.Context, username string) (User, error)
	GetBlockedUserById(c context.Context, user int64, blocked int64) (Blocked, error)
	Delete(c context.Context, blocked *Blocked) error
}
