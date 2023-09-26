package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/utils"
	"net/http"
	"strings"
)

type AuthMiddleware struct {
	LoginUseCase domain.LoginUseCase
}

func (am *AuthMiddleware) Auth(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		parts := strings.Split(token, " ")
		if len(parts) == 2 {
			if parts[0] != "Bearer" {
				c.JSON(http.StatusUnauthorized, gin.H{"message": "Incorrectly formatted token"})
				c.Abort()
				return
			}

			_, err := am.LoginUseCase.VerifyLogout(c, token)
			if err == nil {
				c.JSON(http.StatusUnauthorized, gin.H{"message": "Not authorized"})
				c.Abort()
				return
			}

			username, err := utils.IsAuthorized(parts[1], secret)
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
				c.Abort()
				return
			} else {
				c.Set("x-user-username", username)
				c.Next()
				return
			}
		}
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Not authorized"})
		c.Abort()
	}
}
