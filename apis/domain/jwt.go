package domain

import (
	"github.com/golang-jwt/jwt/v5"
)

type JwtClaims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}
