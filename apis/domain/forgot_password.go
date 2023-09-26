package domain

import (
	"context"
	"time"
)

type ForgotRequest struct {
	Email       string `json:"email" binding:"required"`
	NewPass     string `json:"new_pass" binding:"required"`
	ConfirmPass string `json:"confirm_pass" binding:"required"`
}

type ForgetUseCase interface {
	CreateTwoPhaseCode(c context.Context, pass string, to string, from string, expiry time.Duration) error
	VerifyTwoPhaseCode(c context.Context, code string) (string, error)
	PutUser(c context.Context, user *User) error
	GetUserByEmail(c context.Context, email string) (User, error)
}
