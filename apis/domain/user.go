package domain

import (
	"context"
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	FirstName   string `db:"first_name" json:"first_name"`
	LastName    string `db:"last_name" json:"last_name"`
	Password    string `db:"password" json:"password"`
	Email       string `db:"email" json:"email"`
	Username    string `db:"username" json:"username"`
	NumberPhone string `db:"number_phone" json:"number_phone"`
}

type UserRepository interface {
	GetTwoPhaseCode(c context.Context, code string, prefix string) (string, error)
	SetTwoPhaseCode(c context.Context, code string, email string, prefix string, expiry time.Duration) error
	DeleteTwoPhaseCode(c context.Context, code string, prefix string) error
	SendEmailTwoPhaseCode(message string, to string, from string) error
	GetAll(c context.Context) ([]User, error)
	GetId(c context.Context, id int64) (User, error)
	GetEmail(c context.Context, email string) (User, error)
	GetUsername(c context.Context, username string) (User, error)
	Post(c context.Context, user *User) error
	Put(c context.Context, user *User) error
}
