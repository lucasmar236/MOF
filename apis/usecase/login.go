package usecase

import (
	"context"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/utils"
	"math/rand"
	"strconv"
	"time"
)

type LoginUseCase struct {
	user    domain.UserRepository
	timeout time.Duration
}

func NewLoginUseCase(userRepository domain.UserRepository, timeout time.Duration) domain.LoginUseCase {
	return &LoginUseCase{
		user:    userRepository,
		timeout: timeout,
	}
}

func (lu *LoginUseCase) GetUserByUsername(c context.Context, username string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, lu.timeout)
	defer cancel()
	return lu.user.GetUsername(ctx, username)
}

func (lu *LoginUseCase) GetUserByEmail(c context.Context, username string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, lu.timeout)
	defer cancel()
	return lu.user.GetUsername(ctx, username)
}

func (lu *LoginUseCase) CreateAccessToken(user *domain.User, secret string, expiry int) (accessToken string, err error) {
	return utils.CreateAccessToken(user, secret, expiry)
}

func (lu *LoginUseCase) CreateTwoPhaseCode(c context.Context, from string, email string, expiry time.Duration) error {
	ctx, cancel := context.WithTimeout(c, lu.timeout)
	defer cancel()
	code := rand.Intn(999999-100000) + 100000
	err := lu.user.SetKey(ctx, strconv.Itoa(code), email, "Login", expiry)
	if err != nil {
		return err
	}
	return lu.user.SendEmail(strconv.Itoa(code), email, from)
}

func (lu *LoginUseCase) VerifyTwoPhaseCode(c context.Context, key string) (string, error) {
	ctx, cancel := context.WithTimeout(c, lu.timeout)
	defer cancel()
	email, err := lu.user.GetKey(ctx, key, "Login")
	if err != nil {
		return "", err
	} else {
		err := lu.user.DeleteKey(ctx, key, "Login")
		if err != nil {
			return "", err
		} else {
			return email, err
		}
	}
}

func (lu *LoginUseCase) Logout(c context.Context, token string, expiry int) error {
	ctx, cancel := context.WithTimeout(c, lu.timeout)
	defer cancel()
	exp := time.Second * time.Duration(expiry)
	return lu.user.SetKey(ctx, token, "", "Jwt", exp)
}

func (lu *LoginUseCase) VerifyLogout(c context.Context, token string) (string, error) {
	ctx, cancel := context.WithTimeout(c, lu.timeout)
	defer cancel()
	return lu.user.GetKey(ctx, token, "Jwt")
}
