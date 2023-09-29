package usecase

import (
	"context"
	"fmt"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/utils"
	"time"
)

type PrivateChatUseCase struct {
	privateChat domain.ChatPrivateRepository
	user        domain.UserRepository
	timeout     time.Duration
}

func NewPrivateChatUseCase(private domain.ChatPrivateRepository, user domain.UserRepository, timeout time.Duration) domain.ChatPrivateUseCase {
	return &PrivateChatUseCase{
		privateChat: private,
		user:        user,
		timeout:     timeout,
	}
}

func (pu *PrivateChatUseCase) Post(c context.Context, chat domain.PrivateChat) (string, error) {
	chat.Hash = utils.RandomHash(16)
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return chat.Hash, pu.privateChat.Post(ctx, chat)
}

func (pu *PrivateChatUseCase) GetUserByUsername(c context.Context, username string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return pu.user.GetUsername(ctx, username)
}

func (pu *PrivateChatUseCase) GetChatByUsername(c context.Context, chat string, username string) (chatInfo domain.PrivateChat, err error) {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return pu.privateChat.GetChatByUsername(ctx, chat, username)
}

func (pu *PrivateChatUseCase) CreateTokenAccess(c context.Context, chat string, username string, expiry time.Duration) (string, error) {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	code := utils.RandomHash(16)
	err := pu.privateChat.SetKey(ctx, code, fmt.Sprint(chat, " ", username), "Room", expiry)
	if err != nil {
		return "", err
	} else {
		return code, err
	}
}

func (pu *PrivateChatUseCase) VerifyTokenAccess(c context.Context, key string) (string, error) {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return pu.privateChat.GetKey(ctx, key, "Room")
}
