package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/infrastructure"
	"net/http"
)

type UserController struct {
	UserUserCase domain.UserUseCase
	Env          *infrastructure.Env
}

// @Summary Solicita acesso a um chat chat privado
// @Schemes
// @Description Solicita acesso a um chat chat privado
// @Tags Usuários
// @Accept json
// @Produce json
// @Success	201	{object} domain.UsersReponse "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Router /users [get]
func (uc *UserController) GetAll(c *gin.Context) {
	users, err := uc.UserUserCase.GetAll(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
	} else {
		c.JSON(http.StatusOK, domain.UsersReponse{Users: users})
	}
}
