package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/infrastructure"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"strings"
	"time"
)

type ForgotController struct {
	ForgotUseCase domain.ForgetUseCase
	Env           *infrastructure.Env
}

func (fu *ForgotController) ForgotPassword(c *gin.Context) {
	var request domain.ForgotRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if request.NewPass == request.ConfirmPass {
		password, err := bcrypt.GenerateFromPassword([]byte(request.NewPass), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		} else {
			expiry := time.Minute * time.Duration(fu.Env.ExpiryCode)
			go func() {
				err := fu.ForgotUseCase.CreateTwoPhaseCode(c, string(password), request.Email, fu.Env.EmailFrom, expiry)
				if err != nil {
					fmt.Println("Error to send email to ", request.Email)
				}
			}()
			c.JSON(http.StatusOK, gin.H{"message": "If email is valid, a email with code will send"})
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Passwords is not equal"})
	}
}

func (fu *ForgotController) VerifyTwoPhase(c *gin.Context) {
	var request domain.TwoPhaseRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}

	info, err := fu.ForgotUseCase.VerifyTwoPhaseCode(c, request.Code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
	}
	parts := strings.Split(info, " ")
	if len(parts) != 2 {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error, contact the administrator"})
	}

	user, err := fu.ForgotUseCase.GetUserByEmail(c, parts[0])
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
	}

	user.Password = parts[1]

	err = fu.ForgotUseCase.PutUser(c, &user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	} else {
		c.JSON(http.StatusNoContent, gin.H{})
	}
}
