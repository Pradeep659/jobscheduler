Requirements
Go 1.15+
Dependencies managed using Go modules
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/job-scheduler.git
cd job-scheduler/backend
Install dependencies:

Dependencies are managed using Go modules. Make sure you have Go installed and run:

bash
Copy code
go mod tidy
Run the server:

bash
Copy code
go run main.go
The server will start running at http://localhost:8080.

API Endpoints
Submit a job:

Endpoint: POST /submit-job

Example request:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"name": "Example Job"}' http://localhost:8080/jobs

Get all jobs:

Endpoint: GET /get-jobs

Example request:

bash
Copy code
curl http://localhost:8080/jobs
Design Choices and Approaches
Concurrency Management:

Utilized sync.Mutex for handling concurrent access to the Jobs slice to prevent race conditions.
Error Handling:

Implemented error handling for JSON decoding, encoding, and HTTP responses to ensure robustness and reliability.
RESTful API:

Designed RESTful API endpoints (/submit-job and /get-jobs) for submitting jobs and retrieving all jobs, respectively.