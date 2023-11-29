package repository

import (
	"context"
	"github.com/lucasmar236/MOF/domain"
	"gorm.io/gorm"
)

type blockedRepository struct {
	db *gorm.DB
}

func NewBlockedRepository(db *gorm.DB) domain.BlockedRepository {
	return &blockedRepository{db: db}
}

func (br *blockedRepository) GetAll(c context.Context, user string) (users []domain.UserBlockeds, err error) {
	return users, br.db.WithContext(c).
		Table("blockeds").
		Joins("INNER JOIN users ON blockeds.id_blocked = users.id").
		Where("blockeds.id_user = ? AND blockeds.deleted_at IS NULL", user).
		Select("users.first_name, users.last_name, users.email, users.username, users.number_phone").
		Find(&users).Error
}

func (br *blockedRepository) Post(c context.Context, blocked *domain.Blocked) error {
	return br.db.WithContext(c).Save(blocked).Error
}

func (br *blockedRepository) GetId(c context.Context, user int64, blocked int64) (userblocked domain.Blocked, err error) {
	return userblocked, br.db.WithContext(c).
		Where("id_user = ? and id_blocked = ?", user, blocked).
		Find(&userblocked).Error
}

func (br *blockedRepository) Delete(c context.Context, blocked *domain.Blocked) error {
    return br.db.WithContext(c).Delete(blocked).Error
}