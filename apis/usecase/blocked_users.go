package usecase

import (
	"context"
	"github.com/lucasmar236/MOF/domain"
	"time"
)

type BlockedUseCase struct {
	blocked domain.BlockedRepository
	user    domain.UserRepository
	timeout time.Duration
}

func NewBlockedUseCase(blocked domain.BlockedRepository, user domain.UserRepository, timeout time.Duration) domain.BlockedUseCase {
	return &BlockedUseCase{
		blocked: blocked,
		user:    user,
		timeout: timeout,
	}
}

func (bu BlockedUseCase) Post(c context.Context, blocked *domain.Blocked) error {
	ctx, cancel := context.WithTimeout(c, bu.timeout)
	defer cancel()
	return bu.blocked.Post(ctx, blocked)
}

func (bu BlockedUseCase) GetAll(c context.Context, user string) ([]domain.UserBlockeds, error) {
	ctx, cancel := context.WithTimeout(c, bu.timeout)
	defer cancel()
	return bu.blocked.GetAll(ctx, user)
}

func (bu BlockedUseCase) GetUserByUsername(c context.Context, username string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, bu.timeout)
	defer cancel()
	return bu.user.GetUsername(ctx, username)
}

func (bu BlockedUseCase) GetUserById(c context.Context, user int64) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, bu.timeout)
	defer cancel()
	return bu.user.GetId(ctx, user)
}

func (bu BlockedUseCase) GetBlockedUserById(c context.Context, user int64, blocked int64) (domain.Blocked, error) {
	ctx, cancel := context.WithTimeout(c, bu.timeout)
	defer cancel()
	return bu.blocked.GetId(ctx, user, blocked)
}

func (bu BlockedUseCase) Delete(c context.Context, blocked *domain.Blocked) error {
    ctx, cancel := context.WithTimeout(c, bu.timeout)
    defer cancel()
    return bu.blocked.Delete(ctx, blocked)
}