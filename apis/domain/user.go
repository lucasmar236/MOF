package domain

import "context"

type User struct {
	ID          int64  `db:"id" json:"id"`
	FirstName   string `db:"first_name" json:"first_name"`
	LastName    string `db:"last_name" json:"last_name"`
	Password    string `db:"password" json:"password"`
	Email       string `db:"email" json:"email"`
	Username    string `db:"username" json:"username"`
	NumberPhone string `db:"number_phone" json:"number_phone"`
}

type UserRepository interface {
	Fetch(c context.Context) ([]User, error)
}
