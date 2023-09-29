package usecase

import (
	"context"
	"github.com/lucasmar236/MOF/domain"
	"time"
)

type UserUseCase struct {
	user    domain.UserRepository
	timeout time.Duration
}

func NewUserUsecase(userRepository domain.UserRepository, timeout time.Duration) domain.UserUseCase {
	return &UserUseCase{
		user:    userRepository,
		timeout: timeout,
	}
}

func (uu *UserUseCase) GetAll(c context.Context) ([]domain.User, error) {
	ctx, cancel := context.WithTimeout(c, uu.timeout)
	defer cancel()
	return uu.user.GetAll(ctx)
}
