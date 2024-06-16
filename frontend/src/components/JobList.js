import React from 'react';
import './JobList.css';

const JobList = ({ jobs }) => {
    const getStatusSteps = (status) => {
        const steps = ['Pending', 'Running', 'Completed'];
        return steps.map((step, index) => ({
            label: step,
            completed: steps.indexOf(status) >= index
        }));
    };

    if (!jobs || jobs.length === 0) {
        return (
            <div>
                <h2>Job List</h2>
                <p>Currently No Jobs applied</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Job List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job, index) => (
                        <tr key={index}>
                            <td>{job.name}</td>
                            <td>
                                <div className="status-tracker">
                                    {getStatusSteps(job.status).map((step, stepIndex) => (
                                        <div
                                            key={stepIndex}
                                            className={`status-step ${step.completed ? 'completed' : ''}`}
                                        >
                                            <div className="status-circle">{step.completed ? '✔️' : ''}</div>
                                            <div className="status-label">{step.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobList;
