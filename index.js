//#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');
// const { execSync } = require('child_process');

module.exports.getOSType = function() {
    return os.type();
};

module.exports.setUserEnv = function(key, value) {
    handlerUserEnv(key,value,false)
};

module.exports.setSysEnv = function(key, value) {
    handlerSysEnv(key,value,false)
};

module.exports.mergeUserEnv = function(key, value) {
    handlerUserEnv(key,value,true)
};

module.exports.mergeSysEnv = function(key, value) {
    handlerSysEnv(key,value,true)
};

function handlerUserEnv(key, value,isMerge){
    process.env[key] = value;
    if (os.type() === 'Windows_NT') {
        return setWindowsUserEnvVariable(key, value,isMerge);
    }
    if (os.type() === 'Darwin') {
        return setUnixUserEnvVariable(key, value, '~/.bash_profile',isMerge);
    }
    if (os.type() === 'Linux') {
        return setUnixUserEnvVariable(key, value, '~/.bashrc',isMerge);
    }
    return Promise.resolve({ success: false, key, value, error: 'Unsupported OS' });
}
function handlerSysEnv(key, value,isMerge){
    process.env[key] = value;
    if (os.type() === 'Windows_NT') {
        return setWindowsSysEnvVariable(key, value,isMerge);
    }
    if (os.type() === 'Darwin') {
        return setUnixSysEnvVariable(key, value, '/etc/profile',isMerge);
    }
    if (os.type() === 'Linux') {
        return setUnixSysEnvVariable(key, value, '/etc/profile',isMerge);
    }
    return Promise.resolve({ success: false, key, value, error: 'Unsupported OS' });
}

module.exports.getEnvVariable = function(key) {
    return process.env[key];
};

module.exports.backupEnv = function(backupPath) {
    if (!backupPath) {
        backupPath = path.join(os.homedir(), '.env-profile_backup.json');
    }
    // const backupPath = path.join(os.homedir(), '.env-profile_backup.json');
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
    if (!backupPath) {
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

function setWindowsUserEnvVariable(key, value,isMerge) {
    return new Promise((resolve) => {
        let command = `setx ${key} ${value}`
        if(isMerge === true){
            command = `setx ${key} ${value};%${key}%`
        }
        exec(command, (error) => {
            if (error) {
                resolve({ success: false, key, value, error: error.message });
            } else {
                resolve({ success: true, key, value });
            }
        });
    });
}

function setWindowsSysEnvVariable(key, value,isMerge) {
    return new Promise((resolve) => {
        let command = `setx /m ${key} ${value}`
        if(isMerge === true){
            command = `setx /m ${key} ${value};%${key}%`
        }
        exec(command, (error) => {
            if (error) {
                resolve({ success: false, key, value, error: error.message });
            } else {
                resolve({ success: true, key, value });
            }
        });
    });
}

function setUnixUserEnvVariable(key, value, configFile,isMerge) {
    return new Promise((resolve) => {
        let command = `echo 'export ${key}=${value}' >> ${configFile}`
        if(isMerge === true){
            command = `echo 'export ${key}=${value}:$${key}' >> ${configFile}`
        }
        exec(command, (error) => {
            if (error) {
                resolve({ success: false, key, value, error: error.message });
            } else {
                resolve({ success: true, key, value });
            }
        });
    });
}

function setUnixSysEnvVariable(key, value, configFile,isMerge) {
    return new Promise((resolve) => {
        let command = `echo 'export ${key}=${value}' | sudo tee -a ${configFile}`
        if(isMerge === true){
            command = `echo 'export ${key}=${value}:$${key}' | sudo tee -a ${configFile}`
        }
        exec(command, (error) => {
            if (error) {
                resolve({ success: false, key, value, error: error.message });
            } else {
                resolve({ success: true, key, value });
            }
        });
    });
}
