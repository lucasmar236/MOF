package domain

import "time"

type Profile struct {
	FirstName   string    `db:"first_name" json:"first_name"`
	LastName    string    `db:"last_name" json:"last_name"`
	Email       string    `db:"email" json:"email"`
	Username    string    `db:"username" json:"username"`
	NumberPhone string    `db:"number_phone" json:"number_phone"`
	CreatedAt   time.Time `json:"created_at"`
}

type ProfileUseCase interface {
}
