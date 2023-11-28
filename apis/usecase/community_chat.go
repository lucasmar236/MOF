package usecase

import (
	"context"
	"fmt"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/utils"
	"time"
)

type CommunityChatUseCase struct {
	communityChat domain.ChatCommunityRepository
	user          domain.UserRepository
	timeout       time.Duration
}

func NewCommunityChatUseCase(community domain.ChatCommunityRepository, user domain.UserRepository, timeout time.Duration) domain.ChatCommunityUseCase {
	return &CommunityChatUseCase{
		communityChat: community,
		user:          user,
		timeout:       timeout,
	}
}

func (pu *CommunityChatUseCase) Post(c context.Context, chat domain.CommunityChat) (string, error) {
	chat.Hash = utils.RandomHash(16)
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return chat.Hash, pu.communityChat.Post(ctx, chat)
}

func (pu *CommunityChatUseCase) GetUserByUsername(c context.Context, username string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return pu.user.GetUsername(ctx, username)
}

func (pu *CommunityChatUseCase) GetChatByUsername(c context.Context, chat string, username string) (chatInfo domain.CommunityChat, err error) {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return pu.communityChat.GetChatByUsername(ctx, chat, username)
}

func (pu *CommunityChatUseCase) CreateTokenAccess(c context.Context, chat string, username string, expiry time.Duration) (string, error) {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	code := utils.RandomHash(16)
	err := pu.communityChat.SetKey(ctx, code, fmt.Sprint(chat, " ", username), "Room", expiry)
	if err != nil {
		return "", err
	} else {
		return code, err
	}
}

func (pu *CommunityChatUseCase) VerifyTokenAccess(c context.Context, key string) (string, error) {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return pu.communityChat.GetKey(ctx, key, "Room")
}

func (pu *CommunityChatUseCase) PostContact(c context.Context, contacts []domain.ContactsCommunityChat) error {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return pu.communityChat.PostContact(ctx, contacts)
}
