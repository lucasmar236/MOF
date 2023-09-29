package domain

import (
	"context"
	"gorm.io/gorm"
	"time"
)

type CommunityChat struct {
	ID        uint           `json:"id,omitempty" gorm:"primaryKey"`
	Name      string         `json:"name" db:"name"`
	Hash      string         `json:"hash" db:"hash" gorm:"primaryKey"`
	Admin     uint           `json:"admin" db:"admin"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}

type ContactsCommunityChat struct {
	ID        uint           `json:"id,omitempty" gorm:"primaryKey"`
	Hash      string         `json:"hash" db:"hash"`
	IdUser    uint           `json:"id_user" db:"id_user"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}

type CommunityChatRequest struct {
	Name     string `json:"name"`
	Contacts []uint `json:"contacts"`
}

type ChatCommunityRepository interface {
	Post(c context.Context, chat CommunityChat) error
	GetKey(c context.Context, key string, prefix string) (string, error)
	SetKey(c context.Context, key string, value string, prefix string, expiry time.Duration) error
	GetChatByUsername(c context.Context, chat string, username string) (chatInfo CommunityChat, err error)
	PostContact(c context.Context, contacts []ContactsCommunityChat) error
}

type ChatCommunityUseCase interface {
	Post(c context.Context, chat CommunityChat) (string, error)
	CreateTokenAccess(c context.Context, chat string, username string, expiry time.Duration) (string, error)
	VerifyTokenAccess(c context.Context, key string) (string, error)
	GetUserByUsername(c context.Context, username string) (User, error)
	GetChatByUsername(c context.Context, chat string, username string) (chatInfo CommunityChat, err error)
	PostContact(c context.Context, contacts []ContactsCommunityChat) error
}
