package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/lucasmar236/MOF/domain"
	"github.com/lucasmar236/MOF/infrastructure"
	"net/http"
	"strconv"
)

type ContactController struct {
	ContactUseCase domain.ContactUseCase
	Env            *infrastructure.Env
}

// @Summary Lista todos os contatos do usuário com filtro opcional
// @Schemes
// @Description Lista todos os contatos do usuário com filtro opcional
// @Tags Contatos
// @Accept json
// @Produce json
// @Param	username	query	string	false	"Filtro de contatos"
// @Success	200	{object} domain.ContactResponse "Sucesso"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router /contacts [get]
func (cc *ContactController) GetContacts(c *gin.Context) {
	username := c.GetString("x-user-username") // pega o usuario que esta logado

	user, err := cc.ContactUseCase.GetUserByUsername(c, username) // pega os dados do usuario que esta logado
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	usernameFilter := c.Query("username")

	users, err := cc.ContactUseCase.GetFilteredContacts(c, strconv.FormatUint(uint64(user.ID), 10), usernameFilter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
	} else {
		c.JSON(http.StatusOK, domain.ContactResponse{Contacts: users})
	}
}

// @Summary Adiciona contato ao usuário
// @Schemes
// @Description  Adiciona contato ao usuário
// @Tags Contatos
// @Accept json
// @Produce json
// @Param	Corpo	body	domain.Contact	true	"Dados do contato"
// @Success	201	{object} domain.Response "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router  /contacts [post]
func (cc *ContactController) Post(c *gin.Context) {
	username := c.GetString("x-user-username") // pega o usuario que esta logado

	user, err := cc.ContactUseCase.GetUserByUsername(c, username) // pega os dados do usuario que esta logado
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	var contact = domain.Contact{
		IdUser: user.ID,
	}
	var contactUser domain.User
	err = c.ShouldBind(&contactUser)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	// Buscar o ID do contato com base no username
	contactIdUser, err := cc.ContactUseCase.GetUserByUsername(c, contactUser.Username)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

	// Atribuir o ID do contato
	contact.IdContact = contactIdUser.ID

	if contact.IdContact == contact.IdUser {
		c.JSON(http.StatusBadRequest, domain.Response{Message: "Is not possible add same contact to owner"})
		return
	}

	cont, err := cc.ContactUseCase.GetContactById(c, int64(contact.IdUser), int64(contact.IdContact))
	if err == nil {
		if cont.IdContact != 0 {
			c.JSON(http.StatusBadRequest, domain.Response{Message: "Contact already exists"})
			return
		}
	}

	_, err = cc.ContactUseCase.GetUserById(c, int64(contact.IdContact))
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}
	fmt.Println(contact.ID)

	err = cc.ContactUseCase.Post(c, &contact)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	c.JSON(http.StatusCreated, domain.Response{Message: "contact added"})
}


// @Summary Deleta contato do usuário
// @Schemes
// @Description Deleta contato do usuário
// @Tags Contatos
// @Accept json
// @Produce json
// @Param    username    query    string   true    "Username do contato a ser removido"
// @Success 204 {object} domain.Response "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 404 {object} domain.Response "Contato não encontrado"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router  /contacts [delete]
func (cc *ContactController) Delete(c *gin.Context) {
	username := c.GetString("x-user-username") // pega o usuario que esta logado

	user, err := cc.ContactUseCase.GetUserByUsername(c, username) // pega os dados do usuario que esta logado
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	deleteRequest := c.Query("username") // Obter o username do parâmetro de consulta

	// verifica se o contato existe
	contactIDUser, err := cc.ContactUseCase.GetUserByUsername(c, deleteRequest)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	cont, err := cc.ContactUseCase.GetContactById(c, int64(user.ID), int64(contactIDUser.ID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	if cont.IdContact == 0 {
		c.JSON(http.StatusBadRequest, domain.Response{Message: "Contact not found"})
		return
	}

	// exclui o contato
	if err := cc.ContactUseCase.Delete(c, &cont); err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}