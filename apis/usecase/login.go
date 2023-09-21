package usecase

import (
	"context"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/utils"
	"time"
)

type LoginUseCase struct {
	user    domain.UserRepository
	timeout time.Duration
}

func NewLoginUseCase(userRepository domain.UserRepository, timeout time.Duration) *LoginUseCase {
	return &LoginUseCase{
		user:    userRepository,
		timeout: timeout,
	}
}

func (lu *LoginUseCase) GetUserByEmail(c context.Context, email string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, lu.timeout)
	defer cancel()
	return lu.user.GetEmail(ctx, email)

}

func (lu *LoginUseCase) GetUserByUsername(c context.Context, username string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, lu.timeout)
	defer cancel()
	return lu.user.GetUsername(ctx, username)
}

func (lu *LoginUseCase) CreateAccessToken(user *domain.User, secret string, expiry int) (accessToken string, err error) {
	return utils.CreateAccessToken(user, secret, expiry)
}
