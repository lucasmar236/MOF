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

// @Summary Esqueci minha senha
// @Schemes
// @Description Esqueci minha senha
// @Tags Esqueci minha senha
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.ForgotRequest	true	"Dados da comunidade"
// @Success	201	{object} domain.Response "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router /forgot [put]
func (fu *ForgotController) ForgotPassword(c *gin.Context) {
	var request domain.ForgotRequest
	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	if request.NewPass == request.ConfirmPass {
		password, err := bcrypt.GenerateFromPassword([]byte(request.NewPass), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
			return
		} else {
			expiry := time.Minute * time.Duration(fu.Env.ExpiryCode)
			go func() {
				err := fu.ForgotUseCase.CreateTwoPhaseCode(c, string(password), request.Email, fu.Env.EmailFrom, expiry)
				if err != nil {
					fmt.Println("Error to send email to ", request.Email)
				}
			}()
			c.JSON(http.StatusOK, domain.Response{Message: "If email is valid, a email with code will send"})
		}
	} else {
		c.JSON(http.StatusBadRequest, domain.Response{Message: "Passwords is not equal"})
	}
}

// @Summary Realiza a verificação de duplo fator do esqueci minha senha
// @Schemes
// @Description Esqueci minha senha
// @Tags Esqueci minha senha
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.TwoPhaseRequest	true	"Dados da verificação"
// @Success	204	{} {} "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router /forgot/verify [post]
func (fu *ForgotController) VerifyTwoPhase(c *gin.Context) {
	var request domain.TwoPhaseRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
	}

	info, err := fu.ForgotUseCase.VerifyTwoPhaseCode(c, request.Code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
	}
	parts := strings.Split(info, " ")
	if len(parts) != 2 {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: "Error, contact the administrator"})
	}

	user, err := fu.ForgotUseCase.GetUserByEmail(c, parts[0])
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
	}

	user.Password = parts[1]

	err = fu.ForgotUseCase.PutUser(c, &user)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
	} else {
		c.JSON(http.StatusNoContent, gin.H{})
	}
}
