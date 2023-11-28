package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/infrastructure"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"
)

type LoginController struct {
	LoginUseCase domain.LoginUseCase
	Env          *infrastructure.Env
}

// @Summary Realiza a autenticação do usuário
// @Schemes
// @Description Realiza a autenticação
// @Tags Login
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.LoginRequest	true	"Dados do login"
// @Success	200	{object} domain.TwoPhaseResponse "Sucesso"
// @Failure 400 {object} domain.Response "Crendeciais inválidas"
// @Failure 500 {object} domain.Response "Erro ao logar"
// @Router /login [post]
func (lc *LoginController) Login(c *gin.Context) {
	var request domain.LoginRequest
	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	var user domain.User
	user, err = lc.LoginUseCase.GetUserByEmail(c, request.Login)
	if err != nil {
		user, err = lc.LoginUseCase.GetUserByUsername(c, request.Login)
		if err != nil {
			c.JSON(http.StatusBadRequest, domain.Response{Message: "Invalid credentials"})
			return
		}
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)) != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: "Invalid credentials"})
		return
	}

	expiry := time.Minute * time.Duration(lc.Env.ExpiryCode)
	go func() {
		err := lc.LoginUseCase.CreateTwoPhaseCode(c, lc.Env.EmailFrom, user.Email, expiry)
		if err != nil {
			fmt.Println("Error to send email to ", user.Email)
		}
	}()
	c.JSON(http.StatusOK, domain.Response{Message: "E-mail with code verification sent"})
}

// @Summary Realiza a autenticação dem duplo fator
// @Schemes
// @Description Realiza o login
// @Tags Login
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.TwoPhaseRequest	true	"Dados da verificação"
// @Success	200	{object} domain.TwoPhaseResponse "Sucesso"
// @Failure 400 {object} domain.Response "Código não informado"
// @Failure 404 {object} domain.Response "Usuário não encontrado"
// @Failure 500 {object} domain.Response "Erro ao verificar codigo"
// @Router /login/verify [post]
func (lc *LoginController) VerifyTwoPhase(c *gin.Context) {
	var request domain.TwoPhaseRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	code, err := lc.LoginUseCase.VerifyTwoPhaseCode(c, request.Code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: "Code invalid"})
		return
	}

	user, err := lc.LoginUseCase.GetUserByEmail(c, code)
	if err != nil {
		c.JSON(http.StatusNotFound, domain.Response{Message: "User not found"})
		return
	}

	token, err := lc.LoginUseCase.CreateAccessToken(&user, lc.Env.SecretKey, lc.Env.AccessTime)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, domain.TwoPhaseResponse{AccessToken: token})
}

// @Summary Realiza o logout do usuário
// @Schemes
// @Description Realiza o logout do usuário
// @Tags Login
// @Accept json
// @Produce json
// @Success	204	{} {} "Sucesso"
// @Failure 500 {object} domain.Response "Erro ao realizar logout"
// @Router /logout [post]
func (lc *LoginController) Logout(c *gin.Context) {
	token := c.GetHeader("Authorization")
	err := lc.LoginUseCase.Logout(c, token, lc.Env.AccessTime)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}
	c.JSON(http.StatusNoContent, "")
}
