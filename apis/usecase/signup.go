package usecase

import (
	"context"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/utils"
	"math/rand"
	"strconv"
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

func (su *SignupUseCase) CreateTwoPhaseCode(c context.Context, from string, email string, expiry time.Duration) error {
	code := rand.Intn(999999-100000) + 100000
	err := su.user.SetTwoPhaseCode(c, strconv.Itoa(code), email, "Signup", expiry)
	if err != nil {
		return err
	}
	return su.user.SendEmailTwoPhaseCode(strconv.Itoa(code), email, from)
}

func (su *SignupUseCase) VerifyTwoPhaseCode(c context.Context, code string) (string, error) {
	email, err := su.user.GetTwoPhaseCode(c, code, "Signup")
	if err != nil {
		return "", err
	} else {
		err := su.user.DeleteTwoPhaseCode(c, code, "Signup")
		if err != nil {
			return "", err
		} else {
			return email, err
		}
	}
}