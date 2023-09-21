package domain

import "context"

type LoginRequest struct {
	Login    string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
	AccessToken string `json:"access_token"`
}

type LoginUseCase interface {
	GetUserByEmail(c context.Context, email string) (User, error)
	GetUserByUsername(c context.Context, username string) (User, error)
	CreateAccessToken(user *User, secret string, expiry int) (accessToken string, err error)
}
