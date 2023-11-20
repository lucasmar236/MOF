package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/infrastructure"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type ProfileController struct {
	ProfileUseCase domain.ProfileUseCase
	Env           *infrastructure.Env
}

// @Summary Atualiza os dados do usuário
// @Schemes
// @Description Atualiza os dados do usuário
// @Tags Perfil
// @Accept json
// @Produce json
// @Param user body UserRequest true "Dados do Usuário"
// @Success 200 {object} domain.Response "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 401 {object} domain.Response "Não autorizado"
// @Router /user [put]
func (pu *ProfileController) UpdateUser(c *gin.Context) {
	var request domain.ProfileRequest

	err := c.ShouldBind(&request)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	username := c.GetString("x-user-username") // pega o usuario que esta logado	

	user, err := pu.ProfileUseCase.GetUserByUsername(c, username) // pega os dados do usuario que esta logado
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	// se o novo username da request for diferente do atual, checar se já não pertence a outro usuário. Fazer o mesmo para o e-mail
	if (request.Username != user.Username) {
		_, err = pu.ProfileUseCase.GetUserByUsername(c, request.Username)
		if err == nil {
			c.JSON(http.StatusConflict, domain.Response{Message: "Username already belongs to another user"})
			return
		}
	}

	if (request.Email != user.Email) {
		_, err = pu.ProfileUseCase.GetUserByEmail(c, request.Email)
		if err == nil {
			c.JSON(http.StatusConflict, domain.Response{Message: "Email already belongs to another user"})
			return
		}
	}

	// criptografa senha e atualiza usuario
	encryptedPass, err := bcrypt.GenerateFromPassword(
		[]byte(request.Password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	request.Password = string(encryptedPass)
	
	user.FirstName = request.FirstName
	user.LastName = request.LastName
	user.Password = request.Password
	user.Email = request.Email
	user.Username = request.Username
	user.NumberPhone = request.NumberPhone

	err = pu.ProfileUseCase.PutUser(c, &user)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}
}