package domain

import "context"

type Chats struct {
	Hash string `json:"hash" db:"hash"`
}

type ChatsResponse struct {
	Chats []Chats `json:"chats"`
}

type ChatsRepository interface {
	GetAll(c context.Context, user int64) ([]Chats, error)
}

type ChatsUseCase interface {
	GetAll(c context.Context, user int64) ([]Chats, error)
}
