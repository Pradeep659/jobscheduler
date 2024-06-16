package models

import (
    "time"
)

type Job struct {
	ID       int            `json:"id"`
    Name     string        `json:"name"`
    Duration time.Duration `json:"duration"`
    Status   string        `json:"status"`
}

type Response struct {
	Data    interface{} `json:"data"`
	Success bool        `json:"success"`
	Message string      `json:"message"`
}

var Jobs []*Job
