package usecase

import (
	"context"
	"github.com/lucasmar236/MOF/domain"
)

type ChatsUseCase struct {
	chats domain.ChatsRepository
}

func (c *ChatsUseCase) GetAll(ctx context.Context, user int64) ([]domain.Chats, error) {
	return c.chats.GetAll(ctx, user)
}

func NewChatUseCase(chat domain.ChatsUseCase) domain.ChatsUseCase {
	return &ChatsUseCase{chats: chat}
}
