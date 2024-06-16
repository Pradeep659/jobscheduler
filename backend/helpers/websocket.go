package helpers

import (
    "log"
    "net/http"

    "job_scheduler/models"
    "github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan models.Job)
var upgrader = websocket.Upgrader{}

func WebSocketHandler(w http.ResponseWriter, r *http.Request) {
    upgrader.CheckOrigin = func(r *http.Request) bool { return true }

    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Fatal(err)
    }
    defer conn.Close()
    clients[conn] = true

    for {
        job := <-broadcast
        for client := range clients {
            err := client.WriteJSON(job)
            if err != nil {
                log.Printf("error: %v", err)
                client.Close()
                delete(clients, client)
            }
        }
    }
}

func BroadcastJobUpdate(job models.Job) {
    broadcast <- job
}
