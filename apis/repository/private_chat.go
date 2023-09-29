package repository

import (
	"context"
	"fmt"
	"github.com/lucasmar236/MOF/domain"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
	"time"
)

type privateChatRepository struct {
	db    *gorm.DB
	cache *redis.Client
}

func NewPrivateChatRepository(db *gorm.DB, cache *redis.Client) domain.ChatPrivateRepository {
	return &privateChatRepository{
		db:    db,
		cache: cache,
	}
}

func (pr *privateChatRepository) Post(c context.Context, chat domain.PrivateChat) error {
	return pr.db.WithContext(c).Create(&chat).Error
}

func (pr *privateChatRepository) SetKey(c context.Context, value string, email string, prefix string, expiry time.Duration) error {
	return pr.cache.Set(c, fmt.Sprint(prefix, ":", value), email, expiry).Err()
}

func (pr *privateChatRepository) GetKey(c context.Context, key string, prefix string) (string, error) {
	return pr.cache.Get(c, fmt.Sprint(prefix, ":", key)).Result()
}

func (pr *privateChatRepository) GetChatByUsername(c context.Context, chat string, username string) (chatInfo domain.PrivateChat, err error) {
	return chatInfo, pr.db.WithContext(c).
		Joins("left join users on users.id = private_chats.peer1 or users.id = private_chats.peer2").
		Where("users.username = ? and private_chats.hash = ?", username, chat).First(&chatInfo).Error
}
