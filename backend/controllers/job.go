package controllers

import (
	"encoding/json"
	"net/http"
	"sync"

	"job_scheduler/models"
	"job_scheduler/scheduler"
)

var mu sync.Mutex

// SubmitJobHandler handles job submission requests
func SubmitJobHandler(w http.ResponseWriter, r *http.Request) {
	var job models.Job
	if err := json.NewDecoder(r.Body).Decode(&job); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	job.Status = "Pending"

	// Lock the Jobs slice for safe concurrent access
	mu.Lock()
	job.ID = len(models.Jobs) + 1 // Assign an ID to the job
	models.Jobs = append(models.Jobs, &job) // Append pointer to the job
	response := models.Response{
		Data:    &job,
		Success: true,
		Message: "Job submitted successfully",
	}
	go scheduler.ShortestJobFirst()
	mu.Unlock()
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}


// GetJobsHandler handles requests to retrieve all jobs
func GetJobsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	mu.Lock()
	defer mu.Unlock() // Ensure the mutex is unlocked even if an error occurs

	if models.Jobs == nil {
		models.Jobs = []*models.Job{} // Assuming models.Job is the type of the jobs
	}
	response := models.Response{
		Data:    models.Jobs,
		Success: true,
		Message: "Jobs retrieved successfully",
	}

	if err := json.NewEncoder(w).Encode(response); 
	err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
