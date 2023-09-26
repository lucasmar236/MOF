package domain

import (
	"context"
	"time"
)

type SignupRequest struct {
	FirstName   string `json:"first_name" binding:"required"`
	LastName    string `json:"last_name" binding:"required"`
	Password    string `json:"password" binding:"required"`
	Email       string `json:"email" binding:"required"`
	Username    string `json:"username" binding:"required"`
	NumberPhone string `json:"number_phone" binding:"required"`
}

type SignupResponse struct {
	AccessToken string `json:"access_token"`
}

type SignupUseCase interface {
	Post(c context.Context, user *User) error
	GetUserByEmail(c context.Context, email string) (User, error)
	GetUserByUsername(c context.Context, username string) (User, error)
	CreateAccessToken(user *User, secret string, expiry int) (accessToken string, err error)
	CreateTwoPhaseCode(c context.Context, to string, from string, expiry time.Duration) error
	VerifyTwoPhaseCode(c context.Context, code string) (string, error)
}
