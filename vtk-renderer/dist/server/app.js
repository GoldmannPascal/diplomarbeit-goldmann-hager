const { spawn } = require('child_process');

// Create a child process and execute the C++ code
const backendProcess = spawn('g++', ['backend.cpp', '-o', 'backend']);
backendProcess.on('exit', (code, signal) => {
    if (code === 0) {
        console.log('C++ backend compiled successfully.');

        // Execute the compiled C++ code
        const appProcess = spawn('./backend');
        appProcess.stdout.on('data', (data) => {
            console.log(`C++ Backend Output: ${data}`);
        });
    } else {
        console.error('C++ backend compilation failed.');
    }
});


