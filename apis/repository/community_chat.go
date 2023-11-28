package repository

import (
	"context"
	"fmt"
	"github.com/lucasmar236/MOF/domain"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
	"time"
)

type communityChatRepository struct {
	db    *gorm.DB
	cache *redis.Client
}

func NewCommunityChatRepository(db *gorm.DB, cache *redis.Client) domain.ChatCommunityRepository {
	return &communityChatRepository{
		db:    db,
		cache: cache,
	}
}

func (pr *communityChatRepository) Post(c context.Context, chat domain.CommunityChat) error {
	return pr.db.WithContext(c).Create(&chat).Error
}

func (pr *communityChatRepository) SetKey(c context.Context, value string, email string, prefix string, expiry time.Duration) error {
	return pr.cache.Set(c, fmt.Sprint(prefix, ":", value), email, expiry).Err()
}

func (pr *communityChatRepository) GetKey(c context.Context, key string, prefix string) (string, error) {
	return pr.cache.Get(c, fmt.Sprint(prefix, ":", key)).Result()
}

func (pr *communityChatRepository) GetChatByUsername(c context.Context, chat string, username string) (chatInfo domain.CommunityChat, err error) {
	return chatInfo, pr.db.WithContext(c).
		Joins(" left join contacts_community_chats on contacts_community_chats.hash = community_chats.hash").
		Joins("left join users on users.id = contacts_community_chats.id_user").
		Where("users.username = ? and contacts_community_chats.hash = ?", username, chat).First(&chatInfo).Error
}

func (pr *communityChatRepository) PostContact(c context.Context, contacts []domain.ContactsCommunityChat) error {
	return pr.db.WithContext(c).Create(&contacts).Error
}
