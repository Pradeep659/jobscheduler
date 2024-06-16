Overview
This project is a simplified job scheduler with a Go backend and a React frontend. The scheduler uses the Shortest Job First (SJF) algorithm to prioritize jobs and updates the UI in real-time using WebSockets.

Features
Go Backend:
Job representation using Go structs.
Shortest Job First (SJF) scheduling algorithm.
REST API to submit and retrieve jobs.
WebSocket server to broadcast job status updates.

React Frontend:
Display list of jobs with visual indicators for their statuses.
Form to submit new jobs.
WebSocket client for real-time updates.
Prerequisites
Go (version 1.16 or later)
Node.js (version 14 or later) and npm
Setup
Backend (Go)
Clone the repository:

sh
Copy code
git clone https://github.com/Pradeep659/jobscheduler.git
cd job-jobscheduler/backend
Install dependencies:

sh
Copy code
go mod tidy
Run the backend server:

sh
Copy code
go run main.go
Backend API Endpoints:

Submit a new job: POST /jobs
Submit A new job - curl -X POST http://localhost:8080/jobs -H "Content-Type: application/json" -d '{"name": "Software Engineer", "duration": 12}'

Retrieve current list of jobs: GET /jobs
Retrieve current list of jobs - curl http://localhost:8080/jobs

WebSocket endpoint: /ws
Frontend (React)
Navigate to the frontend directory:


sh
Copy code
cd ../frontend
Install dependencies:

sh
Copy code
npm install
Run the frontend application:

sh
Copy code
npm start
Access the frontend in your browser:

Open http://localhost:3000
Design Choices
Backend
SJF Implementation: The SJF algorithm is implemented using a priority queue to ensure jobs with the shortest duration are scheduled first.
WebSockets: The gorilla/websocket library is used to set up WebSocket communication, allowing real-time updates to the frontend whenever job statuses change.
Frontend
React Components: The UI is built using functional components and hooks for state management.
WebSocket Integration: The frontend establishes a WebSocket connection to receive real-time updates and refresh the job list dynamically.
Running Tests
Backend Tests: To run tests for the Go backend, use:
sh
Copy code
go test ./...
Frontend Tests: To run tests for the React frontend, use:
sh
Copy code
npm test
Directory Structure
go
Copy code
job-scheduler/
├── backend/
│   ├── controllers/
│   │   ├──job.go
│   ├── helpers/
│   │   ├──websocket.go
│   ├── models/
│   │   ├──job.go
│   ├── scheduler/
│   │   ├──scheduler.go
│   ├──main.go
│   ├──go.mod
│   ├──go.sum
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobList.js
│   │   │   ├── JobForm.js
│   │   │   ├── WebSocketClient.js
│   │   │   └── JobList.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
├── README.md
└── ...

Conclusion
This project demonstrates a complete full-stack implementation of a job scheduler with real-time UI updates. The Go backend handles job scheduling and WebSocket communication, while the React frontend provides a user-friendly interface for interacting with the job scheduler.

For any questions or further discussions, please feel free to contact me.

This template provides a clear structure for running and understanding the project, ensuring that all necessary details are covered for both the Go backend and the React frontend.
