package domain

import (
	"context"
	"gorm.io/gorm"
	"time"
)

type Contact struct {
	ID        uint           `json:"id,omitempty" gorm:"primaryKey"`
	IdUser    uint           `db:"id_user" json:"id_user"`
	IdContact uint           `db:"id_contact" json:"id_contact"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}

type UserContacts struct {
	FirstName   string `db:"first_name" json:"first_name"`
	LastName    string `db:"last_name" json:"last_name"`
	Email       string `db:"email" json:"email"`
	Username    string `db:"username" json:"username"`
	NumberPhone string `db:"number_phone" json:"number_phone"`
}

type ContactRepository interface {
	Post(c context.Context, contact *Contact) error
	GetAll(c context.Context, user string) ([]UserContacts, error)
	GetId(c context.Context, user int64, contact int64) (Contact, error)
}

type ContactUseCase interface {
	Post(c context.Context, contact *Contact) error
	GetAll(c context.Context, user string) ([]UserContacts, error)
	GetUserById(c context.Context, user int64) (User, error)
	GetContactById(c context.Context, user int64, contact int64) (Contact, error)
}
