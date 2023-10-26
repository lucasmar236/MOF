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

type SignupController struct {
	SignupUseCase domain.SignupUseCase
	Env           *infrastructure.Env
}

// @Summary Realiza o cadastro do usuário
// @Schemes
// @Description Realiza o cadastro do usuário
// @Tags Cadastro
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.SignupRequest	true	"Dados do cadastro"
// @Success	200	{object} domain.Response "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 409 {object} domain.Response "Usuário já existe"
// @Failure 500 {object} domain.Response "Erro ao verificar codigo"
// @Router /signup [post]
func (sc *SignupController) Signup(c *gin.Context) {
	var request domain.SignupRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	_, err = sc.SignupUseCase.GetUserByEmail(c, request.Email)
	if err == nil {
		c.JSON(http.StatusConflict, domain.Response{Message: "User already exists"})
		return
	}

	_, err = sc.SignupUseCase.GetUserByUsername(c, request.Username)
	if err == nil {
		c.JSON(http.StatusConflict, domain.Response{Message: "User already exists"})
		return
	}

	encryptedPass, err := bcrypt.GenerateFromPassword(
		[]byte(request.Password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	request.Password = string(encryptedPass)

	user := domain.User{
		FirstName:   request.FirstName,
		LastName:    request.LastName,
		Password:    request.Password,
		Email:       request.Email,
		Username:    request.Username,
		NumberPhone: request.NumberPhone,
	}

	err = sc.SignupUseCase.Post(c, &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	expiry := time.Minute * time.Duration(sc.Env.ExpiryCode)
	go func() {
		err := sc.SignupUseCase.CreateTwoPhaseCode(c, sc.Env.EmailFrom, user.Email, expiry)
		if err != nil {
			fmt.Println("Error to send email to ", user.Email)
		}
	}()
	c.JSON(http.StatusOK, gin.H{"message": "E-mail with code verification sent"})
}

// @Summary Realiza o cadastro do usuário
// @Schemes
// @Description Realiza o cadastro do usuário
// @Tags Cadastro
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.TwoPhaseRequest	true	"Dados da verificação"
// @Success	200	{object} domain.TwoPhaseResponse "Sucesso"
// @Failure 400 {object} domain.Response "Código não informado"
// @Failure 404 {object} domain.Response "Usuário não encontrado"
// @Failure 500 {object} domain.Response "Erro ao verificar codigo"
// @Router /signup/verify [post]
func (sc *SignupController) VerifyTwoPhase(c *gin.Context) {
	var request domain.TwoPhaseRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	code, err := sc.SignupUseCase.VerifyTwoPhaseCode(c, request.Code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: "Code invalid"})
		return
	}

	user, err := sc.SignupUseCase.GetUserByEmail(c, code)
	if err != nil {
		c.JSON(http.StatusNotFound, domain.Response{Message: "User not found"})
		return
	}

	token, err := sc.SignupUseCase.CreateAccessToken(&user, sc.Env.SecretKey, sc.Env.AccessTime)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	c.JSON(http.StatusCreated, domain.TwoPhaseResponse{AccessToken: token})
}
