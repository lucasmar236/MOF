package repository

import (
	"context"
	"github.com/lucasmar236/MOF/domain"
	"gorm.io/gorm"
)

type userReposity struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) domain.UserRepository {
	return &userReposity{
		db: db,
	}
}

func (ur *userReposity) GetAll(c context.Context) (users []domain.User, err error) {
	return users, ur.db.WithContext(c).Find(&users).Error
}

func (ur *userReposity) Post(c context.Context, user *domain.User) error {
	return ur.db.WithContext(c).Create(user).Error
}

func (ur *userReposity) GetId(c context.Context, id int64) (user domain.User, err error) {
	return user, ur.db.WithContext(c).Where("id = ?", id).First(&user).Error
}
func (ur *userReposity) GetEmail(c context.Context, email string) (user domain.User, err error) {
	return user, ur.db.WithContext(c).Where("email = ?", email).First(&user).Error
}

func (ur *userReposity) GetUsername(c context.Context, username string) (user domain.User, err error) {
	return user, ur.db.WithContext(c).Where("username = ?", username).First(&user).Error
}

func (ur *userReposity) Put(c context.Context, user *domain.User) error {
	return ur.db.WithContext(c).Save(user).Error
}
