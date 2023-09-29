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

func (cc *ContactController) GetAll(c *gin.Context) {
	users, err := cc.ContactUseCase.GetAll(c, c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"contacts": users})
	}
}

func (cc *ContactController) Post(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID invalid"})
		return
	}

	var contact = domain.Contact{
		IdUser: uint(id),
	}
	err = c.ShouldBind(&contact)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if contact.IdContact == contact.IdUser {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Is not impossible add same contact to owner"})
		return
	}

	cont, err := cc.ContactUseCase.GetContactById(c, int64(contact.IdUser), int64(contact.IdContact))
	if err == nil {
		if cont.IdContact != 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Contact already exists"})
			return
		}
	}

	_, err = cc.ContactUseCase.GetUserById(c, int64(contact.IdContact))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = cc.ContactUseCase.Post(c, &contact)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "contact added"})
}
