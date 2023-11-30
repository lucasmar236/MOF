package usecase

import (
	"context"
	"github.com/lucasmar236/MOF/domain"
	"time"
)

type ContactUseCase struct {
	contact domain.ContactRepository
	user    domain.UserRepository
	timeout time.Duration
}

func NewContactUseCase(contact domain.ContactRepository, user domain.UserRepository, timeout time.Duration) domain.ContactUseCase {
	return &ContactUseCase{
		contact: contact,
		user:    user,
		timeout: timeout,
	}
}

func (cu ContactUseCase) Post(c context.Context, contact *domain.Contact) error {
	ctx, cancel := context.WithTimeout(c, cu.timeout)
	defer cancel()
	return cu.contact.Post(ctx, contact)
}

func (cu ContactUseCase) GetFilteredContacts(c context.Context, user string, filter string) ([]domain.UserContacts, error) {
	ctx, cancel := context.WithTimeout(c, cu.timeout)
	defer cancel()
	return cu.contact.GetFilteredContacts(ctx, user, filter)
}

func (cu ContactUseCase) GetUserByUsername(c context.Context, username string) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, cu.timeout)
	defer cancel()
	return cu.user.GetUsername(ctx, username)
}

func (cu ContactUseCase) GetUserById(c context.Context, user int64) (domain.User, error) {
	ctx, cancel := context.WithTimeout(c, cu.timeout)
	defer cancel()
	return cu.user.GetId(ctx, user)
}

func (cu ContactUseCase) GetContactById(c context.Context, user int64, contact int64) (domain.Contact, error) {
	ctx, cancel := context.WithTimeout(c, cu.timeout)
	defer cancel()
	return cu.contact.GetId(ctx, user, contact)
}

func (cu ContactUseCase) Delete(c context.Context, contact *domain.Contact) error {
    ctx, cancel := context.WithTimeout(c, cu.timeout)
    defer cancel()
    return cu.contact.Delete(ctx, contact)
}