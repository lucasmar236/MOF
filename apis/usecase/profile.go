package usecase

import (
	"github.com/lucasmar236/MOF/domain"
	"time"
	"context"
)

type ProfileUseCase struct {
	user    domain.UserRepository
	timeout time.Duration
}

func NewProfileUseCase(user domain.UserRepository, timeout time.Duration) domain.ProfileUseCase {
	return &ProfileUseCase{
		user:    user,
		timeout: timeout,
	}
}

func (pu *ProfileUseCase) PutUser(c context.Context, user *domain.User) error {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return pu.user.Put(ctx, user)
}

func (pu *ProfileUseCase) GetUserByUsername(c context.Context, username string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return pu.user.GetUsername(ctx, username)
}

func (pu *ProfileUseCase) GetUserByEmail(c context.Context, email string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return pu.user.GetEmail(ctx, email)
}

func (pu *ProfileUseCase) DeleteUser(c context.Context, user *domain.User) error {
	ctx, cancel := context.WithTimeout(c, pu.timeout)
	defer cancel()
	return pu.user.Delete(ctx, user)
}