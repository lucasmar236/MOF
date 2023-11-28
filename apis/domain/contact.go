package domain

import (
	"context"
	"gorm.io/gorm"
	"time"
)

type Contact struct {
	ID        uint           `json:"id,omitempty" gorm:"primaryKey" swaggerignore:"true"`
	IdUser    uint           `db:"id_user" json:"id_user" swaggerignore:"true"`
	IdContact uint           `db:"id_contact" json:"id_contact"`
	CreatedAt time.Time      `json:"created_at" swaggerignore:"true"`
	UpdatedAt time.Time      `json:"updated_at"  swaggerignore:"true"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"  swaggerignore:"true"`
}

type UserContacts struct {
	FirstName   string `db:"first_name" json:"first_name"`
	LastName    string `db:"last_name" json:"last_name"`
	Email       string `db:"email" json:"email"`
	Username    string `db:"username" json:"username"`
	NumberPhone string `db:"number_phone" json:"number_phone"`
}

type ContactResponse struct {
	Contacts []UserContacts `json:"contacts"`
}

type ContactRepository interface {
	Post(c context.Context, contact *Contact) error
	GetAll(c context.Context, user string) ([]UserContacts, error)
	GetId(c context.Context, user int64, contact int64) (Contact, error)
	Delete(c context.Context, contact *Contact) error
}

type ContactUseCase interface {
	Post(c context.Context, contact *Contact) error
	GetAll(c context.Context, user string) ([]UserContacts, error)
	GetUserById(c context.Context, user int64) (User, error)
	GetUserByUsername(c context.Context, username string) (User, error)
	GetContactById(c context.Context, user int64, contact int64) (Contact, error)
	Delete(c context.Context, contact *Contact) error
}
