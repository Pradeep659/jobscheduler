import React, { useState } from 'react';
import axios from 'axios';
import { Stack, TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel, IconButton, Toolbar, AppBar } from '@mui/material'


const JobForm = ({ onNewJob }) => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = async () => {
        try {
            let data = JSON.stringify({
                "name": name,
                "duration": parseInt(duration)
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/jobs',
                headers: { 
                    'Content-Type': 'application/json', 
                },
                data: data
            };

            const response = await axios.request(config);
            onNewJob(response.data.data);
            setName('');
            setDuration('');
        } catch (error) {
            console.error('There was an error adding the job!', error);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    const jobTypes = [
        'Software Engineer',
        'Data Scientist',
        'Financial Analyst',
        'Accountant',
        'Operations Manager',
        'HR Specialist',
        'Marketing Manager',
        'Sales Executive',
        'Product Manager',
        'Business Analyst'
    ];

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Job Scheduler
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box 
                component="form" 
                onSubmit={handleSubmit}
                p={4}
                bgcolor="white"
                boxShadow={3}
                borderRadius={2}
                maxWidth={600}
                width="100%"
                sx={{
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Typography variant="h5" component="h2" gutterBottom>
                Job Application Form
            </Typography>
            <Stack spacing={2} direction="row"  sx={{ width: '100%', marginBottom: 4 }}>
            <FormControl fullWidth size='small'>
                    <InputLabel id="job-type-label">Select Job Type</InputLabel>
                    <Select
                        labelId="job-type-label"
                        id="job-type"
                        value={name}
                        onChange={handleNameChange}
                        label="Select Job Type"
                    >
                        {jobTypes.map((job, index) => (
                            <MenuItem key={index} value={job}>
                                {job}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Enter duration"
                    onChange={handleDurationChange}
                    value={duration}
                    required
                    fullWidth
                    size='small'
                />
            </Stack>
            <Box display="flex" justifyContent="center">
                <Button variant="contained" color="secondary" type="submit">
                    Submit
                </Button>
            </Box>
            </Box>
        </Box>          
    );
};

export default JobForm;
