package repository

import "C"
import (
	"context"
	"github.com/lucasmar236/MOF/domain"
	"gorm.io/gorm"
)

type chatsRepository struct {
	db *gorm.DB
}

func (c *chatsRepository) GetAll(ctx context.Context, user int64) (chats []domain.Chats, err error) {
	return chats, c.db.Raw("? UNION ?",
		c.db.Select("hash").Model(&domain.ContactsCommunityChat{}).
			Where("contacts_community_chats.id_user = ? ", user),
		c.db.Select("hash").Model(&domain.PrivateChat{}).
			Where("private_chats.peer1 = ? or private_chats.peer2 = ?", user, user),
	).Scan(&chats).Error
}

func NewChatsRepository(db *gorm.DB) domain.ChatsRepository {
	return &chatsRepository{db: db}
}
