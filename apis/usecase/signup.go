package usecase

import (
	"context"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/utils"
	"time"
)

type SignupUseCase struct {
	user    domain.UserRepository
	timeout time.Duration
}

func NewSignUseCase(userRepository domain.UserRepository, timeout time.Duration) *SignupUseCase {
	return &SignupUseCase{
		user:    userRepository,
		timeout: timeout,
	}
}

func (su *SignupUseCase) Post(c context.Context, user *domain.User) error {
	ctx, cancel := context.WithTimeout(c, su.timeout)
	defer cancel()
	return su.user.Post(ctx, user)
}

func (su *SignupUseCase) GetUserByEmail(c context.Context, email string) (user domain.User, err error) {
	ctx, cancel := context.WithTimeout(c, su.timeout)
	defer cancel()
	return su.user.GetEmail(ctx, email)
}

func (su *SignupUseCase) GetUserByUsername(c context.Context, username string) (user domain.User, err error) {
	ctx, cancel := context.WithTimeout(c, su.timeout)
	defer cancel()
	return su.user.GetUsername(ctx, username)
}

func (su *SignupUseCase) CreateAccessToken(user *domain.User, secret string, expiry int) (accessToken string, err error) {
	return utils.CreateAccessToken(user, secret, expiry)
}
