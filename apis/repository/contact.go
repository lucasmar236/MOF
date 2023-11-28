package repository

import (
	"context"
	"github.com/lucasmar236/MOF/domain"
	"gorm.io/gorm"
)

type contactRepository struct {
	db *gorm.DB
}

func NewContactRepository(db *gorm.DB) domain.ContactRepository {
	return &contactRepository{db: db}
}

func (cr *contactRepository) GetAll(c context.Context, idUser string) (users []domain.UserContacts, err error) {
	return users, cr.db.WithContext(c).Table("users").
		Joins("left join contacts on contacts.id_user = users.id ").
		Where("contacts.id_user = ? AND contacts.deleted_at IS NULL", idUser).Find(&users, "").Error
}

func (cr *contactRepository) Post(c context.Context, contact *domain.Contact) error {
	return cr.db.WithContext(c).Save(contact).Error
}

func (cr *contactRepository) GetId(c context.Context, user int64, contact int64) (usercontact domain.Contact, err error) {
	return usercontact, cr.db.WithContext(c).
		Where("id_user = ? and id_contact = ?", user, contact).
		Find(&usercontact).Error
}

func (cr *contactRepository) Delete(c context.Context, contact *domain.Contact) error {
    return cr.db.WithContext(c).Delete(contact).Error
}