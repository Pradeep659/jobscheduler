import React, { useState, useEffect } from 'react';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import WebSocketClient from './components/WebSocketClient';
import axios from 'axios';


const App = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:8080/jobs');
                setJobs(data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    
    }, []);
    

    const handleNewJob = (job) => {
        console.log(job)
        setJobs([...jobs, job]);
    };

    return (
        <div className="App">
            <JobForm onNewJob={handleNewJob} />
            <JobList jobs={jobs} />
            <WebSocketClient setJobs={setJobs} />
        </div>
    );
}

export default App;
