package usecase

import (
	"context"
	"fmt"
	"github.com/lucasmar236/MOF/domain"
	"math/rand"
	"strconv"
	"time"
)

type ForgotUseCase struct {
	user    domain.UserRepository
	timeout time.Duration
}

func NewForgotUseCase(user domain.UserRepository, timeout time.Duration) domain.ForgetUseCase {
	return &ForgotUseCase{
		user:    user,
		timeout: timeout,
	}
}

func (fu *ForgotUseCase) CreateTwoPhaseCode(c context.Context, pass string, to string, from string, expiry time.Duration) error {
	ctx, cancel := context.WithTimeout(c, fu.timeout)
	defer cancel()
	code := rand.Intn(999999-100000) + 100000
	err := fu.user.SetKey(ctx, strconv.Itoa(code), fmt.Sprint(to, " ", pass), "Forgot", expiry)
	if err != nil {
		return err
	}
	return fu.user.SendEmail(strconv.Itoa(code), to, from)
}

func (fu *ForgotUseCase) VerifyTwoPhaseCode(c context.Context, code string) (string, error) {
	ctx, cancel := context.WithTimeout(c, fu.timeout)
	defer cancel()
	email, err := fu.user.GetKey(ctx, code, "Forgot")
	if err != nil {
		return "", err
	} else {
		err := fu.user.DeleteKey(ctx, code, "Forgot")
		if err != nil {
			return "", err
		} else {
			return email, err
		}
	}
}

func (fu *ForgotUseCase) GetUserByEmail(c context.Context, email string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, fu.timeout)
	defer cancel()
	return fu.user.GetEmail(ctx, email)
}

func (fu *ForgotUseCase) PutUser(c context.Context, user *domain.User) error {
	ctx, cancel := context.WithTimeout(c, fu.timeout)
	defer cancel()
	return fu.user.Put(ctx, user)
}
