package domain


import (
	"context"
	"time"
)

type ProfileRequest struct {
	FirstName   string    `db:"first_name" json:"first_name"`
	LastName    string    `db:"last_name" json:"last_name"`
	Email       string    `db:"email" json:"email"`
	Username    string    `db:"username" json:"username"`
	Password    string    `db:"password" json:"password"`
	NumberPhone string    `db:"number_phone" json:"number_phone"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type ProfileUseCase interface {
	PutUser(c context.Context, user *User) error
	GetUserByUsername(c context.Context, username string) (User, error)
	GetUserByEmail(c context.Context, email string) (User, error)
	DeleteUser(c context.Context, user *User) error
}
