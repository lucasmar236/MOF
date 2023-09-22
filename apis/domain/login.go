package domain

import (
	"context"
	"time"
)

type LoginRequest struct {
	Login    string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type TwoPhaseRequest struct {
	Code string `json:"code" binding:"required"`
}

type TwoPhaseResponse struct {
	AccessToken string `json:"access_token"`
}

type LoginUseCase interface {
	GetUserByEmail(c context.Context, email string) (User, error)
	GetUserByUsername(c context.Context, username string) (User, error)
	CreateAccessToken(user *User, secret string, expiry int) (accessToken string, err error)
	CreateTwoPhaseCode(message string, to string, from string, expiry time.Duration) error
	VerifyTwoPhaseCode(c context.Context, code string) (string, error)
}
