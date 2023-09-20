package domain

import (
	"context"
	"gorm.io/gorm"
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
	GetAll(c context.Context) ([]User, error)
	GetId(c context.Context, id int64) (User, error)
	GetEmail(c context.Context, email string) (User, error)
	Post(c context.Context, user *User) error
	Put(c context.Context, user *User) error
}
