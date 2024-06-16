package main

import (
	"log"
	"net/http"

	"job_scheduler/controllers"
	"job_scheduler/helpers"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	// CORS middleware handler
	corsMiddleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Allow requests from any origin
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")

			// Allow GET, POST, and OPTIONS methods
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

			// Allow the Content-Type header, which is used in POST requests
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization, X-Requested-With, X-CSRF-Token")

			// Handle preflight requests
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusOK)
				return
			}

			// Continue handling the request
			next.ServeHTTP(w, r)
		})
	}

	// Apply CORS middleware globally
	router.Use(corsMiddleware)

	router.HandleFunc("/jobs", controllers.SubmitJobHandler).Methods("POST", "OPTIONS")
	router.HandleFunc("/jobs", controllers.GetJobsHandler).Methods("GET")
	router.HandleFunc("/ws", helpers.WebSocketHandler)

	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
