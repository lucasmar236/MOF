package infrastructure

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/lucasmar236/MOF/domain"
	"github.com/redis/go-redis/v9"
	"net/http"
)

const (
	socketBufferSize  = 1024
	messageBufferSize = 256
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  socketBufferSize,
	WriteBufferSize: socketBufferSize,
}

type Client struct {
	socket  *websocket.Conn
	receive chan []byte
	room    *Room
}

func (c *Client) read() {
	defer c.socket.Close()
	for {
		_, msg, err := c.socket.ReadMessage()
		if err != nil {
			return
		}
		c.room.forward <- msg
	}
}

func (c *Client) write() {
	defer c.socket.Close()
	for msg := range c.receive {
		err := c.socket.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			return
		}
	}
}

type Room struct {
	chat               string
	clients            map[*Client]bool
	join               chan *Client
	leave              chan *Client
	forward            chan []byte
	PrivateChatUsaCase domain.ChatPrivateUseCase
}

func NewRoom(chat string) *Room {
	return &Room{
		chat:    chat,
		clients: make(map[*Client]bool),
		join:    make(chan *Client),
		leave:   make(chan *Client),
		forward: make(chan []byte),
	}
}

func (r *Room) Run() {
	for {
		select {
		case client := <-r.join:
			r.clients[client] = true
		case client := <-r.leave:
			delete(r.clients, client)
			close(client.receive)
		case msg := <-r.forward:
			for client := range r.clients {
				client.receive <- msg
			}
		}
	}
}

func (r *Room) ServeHttp(cache *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Query("access_token")
		_, err := cache.Get(c, fmt.Sprint("Room", ":", token)).Result()
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
			return
		} else {
			_ = cache.Del(c, fmt.Sprint("Room", ":", token)).Err()
		}

		socket, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"opa": "epa"})
			return
		}

		client := &Client{
			socket:  socket,
			receive: make(chan []byte),
			room:    r,
		}
		r.join <- client
		defer func() {
			r.leave <- client
		}()
		go client.write()
		client.read()
	}
}
