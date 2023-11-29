package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/infrastructure"
	"net/http"
	"strconv"
)

type BlockedController struct {
	BlockedUseCase domain.BlockedUseCase
	Env            *infrastructure.Env
}

// @Summary Lista todos os usuários bloqueados pelo usuário logado
// @Schemes
// @Description  Lista todos os usuários bloqueados pelo usuário logado
// @Tags Bloqueados
// @Accept json
// @Produce json
// @Success	201	{object} domain.BlockedResponse "Sucesso"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router /blockeds [get]
func (bc *BlockedController) GetAll(c *gin.Context) {
	username := c.GetString("x-user-username") // pega o usuario que esta logado

	user, err := bc.BlockedUseCase.GetUserByUsername(c, username) // pega os dados do usuario que esta logado
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	users, err := bc.BlockedUseCase.GetAll(c, strconv.FormatUint(uint64(user.ID), 10))
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
	} else {
		c.JSON(http.StatusOK, domain.BlockedResponse{Blockeds: users})
	}
}

// @Summary Adiciona usuário a lista de bloqueados
// @Schemes
// @Description  Adiciona usuário a lista de bloqueados
// @Tags Bloqueados
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.Blocked	true	"Dados do contato"
// @Success	201	{object} domain.Response "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router  /blockeds [post]
func (bc *BlockedController) Post(c *gin.Context) {
	username := c.GetString("x-user-username") // pega o usuario que esta logado

	user, err := bc.BlockedUseCase.GetUserByUsername(c, username) // pega os dados do usuario que esta logado
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	var blocked = domain.Blocked{
		IdUser: user.ID,
	}
	err = c.ShouldBind(&blocked)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	if blocked.IdBlocked == blocked.IdUser {
		c.JSON(http.StatusBadRequest, domain.Response{Message: "Is not possible add same blocked to owner"})
		return
	}

	cont, err := bc.BlockedUseCase.GetBlockedUserById(c, int64(blocked.IdUser), int64(blocked.IdBlocked))
	if err == nil {
		if cont.IdBlocked != 0 {
			c.JSON(http.StatusBadRequest, domain.Response{Message: "User already exists in the blocked's list"})
			return
		}
	}

	_, err = bc.BlockedUseCase.GetUserById(c, int64(blocked.IdBlocked))
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}
	fmt.Println(blocked.ID)

	err = bc.BlockedUseCase.Post(c, &blocked)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	c.JSON(http.StatusCreated, domain.Response{Message: "User added to blocked's list"})
}

// @Summary Deleta usuário da lista de bloqueados
// @Schemes
// @Description Deleta usuário da lista de bloqueados
// @Tags Bloqueados
// @Accept json
// @Produce json
// @Param    BlockedID   body    int64   true    "UserID do usuário a ser removido da lista de bloqueados"
// @Success 204 {object} domain.Response "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 404 {object} domain.Response "Usuário não encontrado"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router  /blockeds [delete]
func (bc *BlockedController) Delete(c *gin.Context) {
	username := c.GetString("x-user-username") // pega o usuario que esta logado

	user, err := bc.BlockedUseCase.GetUserByUsername(c, username) // pega os dados do usuario que esta logado
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	var blockedID struct {
		BlockedID int64 `json:"id_blocked" binding:"required"`
	}
	if err := c.ShouldBindJSON(&blockedID); err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	// verifica se o usuário está na lista de bloqueados
	cont, err := bc.BlockedUseCase.GetBlockedUserById(c, int64(user.ID), blockedID.BlockedID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	if cont.IdBlocked == 0 {
		c.JSON(http.StatusBadRequest, domain.Response{Message: "User not found in blocked's list"})
		return
	}

	// exclui o usuario da lista de bloqueados
	if err := bc.BlockedUseCase.Delete(c, &cont); err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}
