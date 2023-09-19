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

func (ur *userReposity) Fetch(c context.Context) ([]domain.User, error) {
	var users []domain.User
	return users, ur.db.Find(&users).Error
}
