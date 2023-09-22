package repository

import (
	"context"
	"fmt"
	"github.com/lucasmar236/MOF/domain"
	"github.com/redis/go-redis/v9"
	gomail "gopkg.in/mail.v2"
	"gorm.io/gorm"
	"time"
)

type userRepository struct {
	db    *gorm.DB
	cache *redis.Client
	email *gomail.Dialer
}

func NewUserRepository(db *gorm.DB, cache *redis.Client, email *gomail.Dialer) domain.UserRepository {
	return &userRepository{
		db:    db,
		cache: cache,
		email: email,
	}
}

func (ur *userRepository) GetAll(c context.Context) (users []domain.User, err error) {
	return users, ur.db.WithContext(c).Find(&users).Error
}

func (ur *userRepository) Post(c context.Context, user *domain.User) error {
	return ur.db.WithContext(c).Create(user).Error
}

func (ur *userRepository) GetId(c context.Context, id int64) (user domain.User, err error) {
	return user, ur.db.WithContext(c).Where("id = ?", id).First(&user).Error
}
func (ur *userRepository) GetEmail(c context.Context, email string) (user domain.User, err error) {
	return user, ur.db.WithContext(c).Where("email = ?", email).First(&user).Error
}

func (ur *userRepository) GetUsername(c context.Context, username string) (user domain.User, err error) {
	return user, ur.db.WithContext(c).Where("username = ?", username).First(&user).Error
}

func (ur *userRepository) Put(c context.Context, user *domain.User) error {
	return ur.db.WithContext(c).Save(user).Error
}

func (ur *userRepository) GetTwoPhaseCode(c context.Context, code string, prefix string) (string, error) {
	return ur.cache.Get(c, fmt.Sprint(prefix, ":", code)).Result()
}

func (ur *userRepository) SetTwoPhaseCode(c context.Context, code string, email string, prefix string, expiry time.Duration) error {
	return ur.cache.Set(c, fmt.Sprint(prefix, ":", code), email, expiry).Err()
}

func (ur *userRepository) DeleteTwoPhaseCode(c context.Context, code string, prefix string) error {
	return ur.cache.Del(c, fmt.Sprint(prefix, ":", code)).Err()
}

func (ur *userRepository) SendEmailTwoPhaseCode(message string, to string, from string) error {
	m := gomail.NewMessage()
	m.SetHeaders(map[string][]string{
		"From":    {m.FormatAddress(from, "MOF")},
		"To":      {to},
		"Subject": {"Verification in two phase"}})
	m.SetBody("text/plain", message)
	return ur.email.DialAndSend(m)
}
