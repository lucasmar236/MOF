package domain

import (
	"context"
	"gorm.io/gorm"
	"time"
)

type PrivateChat struct {
	ID        uint           `json:"id,omitempty" gorm:"primaryKey"`
	Peer1     uint           `json:"peer_1" db:"peer_1"`
	Peer2     uint           `json:"peer_2" db:"peer_2"`
	Hash      string         `json:"hash" db:"hash" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}

type PrivateChatRequest struct {
	Contact uint `json:"contact"`
}

type AccessChatRequest struct {
	Chat string `json:"chat"`
}

type ChatPrivateRepository interface {
	Post(c context.Context, chat PrivateChat) error
	GetKey(c context.Context, key string, prefix string) (string, error)
	SetKey(c context.Context, key string, value string, prefix string, expiry time.Duration) error
	GetChatByUsername(c context.Context, chat string, username string) (chatInfo PrivateChat, err error)
}

type ChatPrivateUseCase interface {
	Post(c context.Context, chat PrivateChat) error
	CreateTokenAccess(c context.Context, chat string, username string, expiry time.Duration) (string, error)
	VerifyTokenAccess(c context.Context, key string) (string, error)
	GetUserByUsername(c context.Context, username string) (User, error)
	GetChatByUsername(c context.Context, chat string, username string) (chatInfo PrivateChat, err error)
}
