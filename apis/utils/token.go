package utils

import (
	jwt "github.com/golang-jwt/jwt/v5"
	"github.com/lucasmar236/MOF/domain"
	"time"
)

func CreateAccessToken(user *domain.User, secret string, expiry int) (accessToken string, err error) {
	exp := time.Now().Add(time.Hour * time.Duration(expiry))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		&jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(exp),
		})
	return token.SignedString([]byte(secret))
}
