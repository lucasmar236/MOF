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

func (cr *contactRepository) GetFilteredContacts(c context.Context, user string, filter string) (users []domain.UserContacts, err error) {
	return users, cr.db.WithContext(c).
		Table("contacts").
		Joins("INNER JOIN users ON contacts.id_contact = users.id").
		Where("contacts.id_user = ? AND contacts.deleted_at IS NULL AND users.username LIKE ?", user, "%"+filter+"%").
		Order("users.username ASC").
		Select("users.first_name, users.last_name, users.email, users.username, users.number_phone").
		Find(&users).Error
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