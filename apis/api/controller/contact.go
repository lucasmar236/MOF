package controller

import (
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

// @Summary Lista todos os contatos do usuário
// @Schemes
// @Description  Lista todos os contatos do usuário
// @Tags Contatos
// @Accept json
// @Produce json
// @Param    ID   path  string  true  "ID do usuário"
// @Success	201	{object} domain.ContactResponse "Sucesso"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router /users/:id/contacts [get]
func (cc *ContactController) GetAll(c *gin.Context) {
	users, err := cc.ContactUseCase.GetAll(c, c.Param("id"))
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
// @Param    ID   path  string  true  "ID do usuário"
// @Param	Corpo	body	domain.Contact	true	"Dados do contato"
// @Success	201	{object} domain.Response "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router  /users/:id/contacts [post]
func (cc *ContactController) Post(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: "ID invalid"})
		return
	}

	var contact = domain.Contact{
		IdUser: uint(id),
	}
	err = c.ShouldBind(&contact)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
		return
	}

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

	err = cc.ContactUseCase.Post(c, &contact)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{Message: err.Error()})
		return
	}

	c.JSON(http.StatusCreated, domain.Response{Message: "contact added"})
}

// @Summary Remove contato do usuário
// @Schemes
// @Description Remove contato do usuário
// @Tags Contatos
// @Accept json
// @Produce json
// @Param    ID       path    string  true    "ID do usuário"
// @Param    ContactID   body    int64   true    "ID do contato a ser removido"
// @Success 204 {object} domain.Response "Sucesso"
// @Failure 400 {object} domain.Response "Informações inválidas"
// @Failure 500 {object} domain.Response "Erro interno"
// @Router  /users/:id/contacts [delete]
func (cc *ContactController) Delete(c *gin.Context) {
    userID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, domain.Response{Message: "Invalid id"})
        return
    }

    var contactID struct {
        ContactID int64 `json:"id_contact" binding:"required"`
    }
    if err := c.ShouldBindJSON(&contactID); err != nil {
        c.JSON(http.StatusBadRequest, domain.Response{Message: err.Error()})
        return
    }

    // verifica se o contato existe
    cont, err := cc.ContactUseCase.GetContactById(c, int64(userID), contactID.ContactID)
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