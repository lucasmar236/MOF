package utils

import (
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"github.com/lucasmar236/MOF/domain"
	"time"
)

func CreateAccessToken(user *domain.User, secret string, expiry int) (accessToken string, err error) {
	exp := time.Now().Add(time.Hour * time.Duration(expiry))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		domain.JwtClaims{
			Username: user.Username,
			RegisteredClaims: jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(exp),
				ID:        user.Username,
			},
		})
	return token.SignedString([]byte(secret))
}

func IsAuthorized(requestToken string, secret string) (string, error) {
	token, err := jwt.Parse(requestToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})

	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)

	if !ok && !token.Valid {
		return "", fmt.Errorf("invalid Token")
	}
	return claims["username"].(string), nil
}
