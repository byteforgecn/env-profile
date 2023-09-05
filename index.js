//#! /usr/bin/env node

const os = require('os');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');


const os = require('os');
const { exec } = require('child_process');

module.exports.getOSType = function() {
    return os.type();
};

module.exports.setUserEnv = function(key, value) {
    process.env[key] = value;
    if (os.type() === 'Windows_NT') {
        return setWindowsUserEnvVariable(key, value);
    }
    if (os.type() === 'Darwin') {
        return setUnixUserEnvVariable(key, value, '~/.bash_profile');
    }
    if (os.type() === 'Linux') {
        return setUnixUserEnvVariable(key, value, '~/.bashrc');
    }
    return Promise.resolve({ success: false, key, value, error: 'Unsupported OS' });
};

module.exports.setSysEnv = function(key, value) {
    process.env[key] = value;
    if (os.type() === 'Windows_NT') {
        return setWindowsSysEnvVariable(key, value);
    }
    if (os.type() === 'Darwin') {
        return setUnixSysEnvVariable(key, value, '/etc/profile');
    }
    if (os.type() === 'Linux') {
        return setUnixSysEnvVariable(key, value, '/etc/profile');
    }
    return Promise.resolve({ success: false, key, value, error: 'Unsupported OS' });
};

module.exports.getEnvVariable = function(key) {
    return process.env[key];
};

module.exports.backupEnv = function() {
    const backupPath = path.join(os.homedir(), '.env-profile_backup.json');
    const backup = { ...process.env };

    return new Promise((resolve, reject) => {
        fs.writeFile(backupPath, JSON.stringify(backup), (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(backupPath);
            }
        });
    });
};

module.exports.restoreEnv = function(backupPath) {
    if (backupPath==null){
        backupPath = path.join(os.homedir(), '.env-profile_backup.json');
    }
    return new Promise((resolve, reject) => {
        fs.readFile(backupPath, 'utf8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                const backup = JSON.parse(data);
                process.env = { ...backup };
                resolve(backup);
            }
        });
    });
};

function setWindowsUserEnvVariable(key, value) {
    return new Promise((resolve) => {
        exec(`setx ${key} ${value}`, (error) => {
            if (error) {
                resolve({ success: false, key, value, error: error.message });
            } else {
                resolve({ success: true, key, value });
            }
        });
    });
}

function setWindowsSysEnvVariable(key, value) {
    return new Promise((resolve) => {
        exec(`setx /m ${key} ${value}`, (error) => {
            if (error) {
                resolve({ success: false, key, value, error: error.message });
            } else {
                resolve({ success: true, key, value });
            }
        });
    });
}

function setUnixUserEnvVariable(key, value, configFile) {
    return new Promise((resolve) => {
        exec(`echo 'export ${key}=${value}' >> ${configFile}`, (error) => {
            if (error) {
                resolve({ success: false, key, value, error: error.message });
            } else {
                resolve({ success: true, key, value });
            }
        });
    });
}

function setUnixSysEnvVariable(key, value, configFile) {
    return new Promise((resolve) => {
        exec(`echo 'export ${key}=${value}' | sudo tee -a ${configFile}`, (error) => {
            if (error) {
                resolve({ success: false, key, value, error: error.message });
            } else {
                resolve({ success: true, key, value });
            }
        });
    });
}
