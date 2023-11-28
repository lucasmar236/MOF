package domain

import (
	"context"
	"gorm.io/gorm"
	"time"
)

type User struct {
	ID          uint           `json:"id,omitempty" gorm:"primaryKey"`
	FirstName   string         `db:"first_name" json:"first_name"`
	LastName    string         `db:"last_name" json:"last_name"`
	Password    string         `db:"password" json:"password"`
	Email       string         `db:"email" json:"email"`
	Username    string         `db:"username" json:"username"`
	NumberPhone string         `db:"number_phone" json:"number_phone"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index" swaggerignore:"true"`
}

type UsersReponse struct {
	Users []User `json:"users"`
}

type UserRepository interface {
	GetKey(c context.Context, key string, prefix string) (string, error)
	SetKey(c context.Context, key string, value string, prefix string, expiry time.Duration) error
	DeleteKey(c context.Context, key string, prefix string) error
	SendEmail(message string, to string, from string) error
	GetAll(c context.Context) ([]User, error)
	GetId(c context.Context, id int64) (User, error)
	GetEmail(c context.Context, email string) (User, error)
	GetUsername(c context.Context, username string) (User, error)
	Post(c context.Context, user *User) error
	Put(c context.Context, user *User) error
	Delete(c context.Context, user *User) error
}

type UserUseCase interface {
	GetAll(c context.Context) ([]User, error)
}
