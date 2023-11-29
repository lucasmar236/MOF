package infrastructure

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/lucasmar236/MOF/domain"
	"github.com/redis/go-redis/v9"
	"net/http"
)

const (
	socketBufferSize = 1024
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  socketBufferSize,
	WriteBufferSize: socketBufferSize,
}

type Client struct {
	id      string
	socket  *websocket.Conn
	receive chan Message
	room    *Room
}

type Message struct {
	ID  string `json:"ID"`
	Msg []byte `json:"msg"`
}

func (c *Client) read() {
	defer c.socket.Close()
	for {
		_, msg, err := c.socket.ReadMessage()
		if err != nil {
			return
		}
		msgClient := Message{ID: c.id, Msg: msg}
		if err != nil {
			return
		}
		c.room.forward <- msgClient
	}
}

func (c *Client) write() {
	defer c.socket.Close()
	for msg := range c.receive {
		msgClient, err := json.Marshal(msg)
		if err != nil {
			return
		}
		err = c.socket.WriteMessage(websocket.TextMessage, msgClient)
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
	forward            chan Message
	PrivateChatUsaCase domain.ChatPrivateUseCase
}

func NewRoom(chat string) *Room {
	return &Room{
		chat:    chat,
		clients: make(map[*Client]bool),
		join:    make(chan *Client),
		leave:   make(chan *Client),
		forward: make(chan Message),
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
				if client.id != msg.ID {
					client.receive <- msg
				}
			}
		}
	}
}
func (r *Room) ServeHttp(cache *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.Query("access_token")
		user, err := cache.Get(c, fmt.Sprint("Room", ":", token)).Result()
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
			id:      user,
			socket:  socket,
			receive: make(chan Message),
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
