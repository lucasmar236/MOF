package infrastructure

import (
	"context"
	"fmt"
	"github.com/redis/go-redis/v9"
	"log"
)

func NewCache(env *Env) *redis.Client {
	rdb := redis.NewClient(&redis.Options{
		Addr: fmt.Sprint(env.CacheHost, ":", env.CachePort),
	})

	_, err := rdb.Ping(context.Background()).Result()
	if err != nil {
		log.Fatal("Redis error: ", err.Error())
	}
	return rdb
}
