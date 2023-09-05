# env-profile

[![NPM](https://nodei.co/npm/env-profile.png?downloads=true&stars=true)](https://www.npmjs.com/package/env-profile)

> Do not use while still under development
>
> 仍在开发 请勿使用

> An npm package to manage "environment variables" for Windows, "/etc/profile" for Linux, and ".bash_profile" for Mac.
>
> 用于管理 Windows 的“环境变量”、Linux 的“/etc/profile”和 Mac 的“.bash_profile”的 npm 包。
>

## Installation 安装

```bash
npm install env-profile
```

## Usage 用法

```js
import { getOSType, setUserEnv, setSysEnv, getEnvVariable, backupEnv, restoreEnv } from 'env-profile';

// 获取操作系统类型 (Get the operating system type)
const osType = getOSType();
console.log('操作系统类型:', osType);

// 设置用户环境变量 (Set user environment variable)
setUserEnv('KEY', 'VALUE')
    .then((result) => {
        if (result.success) {
            console.log(`成功设置用户环境变量 ${result.key}=${result.value}`); // Successfully set user environment variable
        } else {
            console.error(`无法设置用户环境变量 ${result.key}=${result.value}: ${result.error}`); // Failed to set user environment variable
        }
    });

// 设置系统环境变量 (Set system environment variable)
setSysEnv('KEY', 'VALUE')
    .then((result) => {
        if (result.success) {
            console.log(`成功设置系统环境变量 ${result.key}=${result.value}`); // Successfully set system environment variable
        } else {
            console.error(`无法设置系统环境变量 ${result.key}=${result.value}: ${result.error}`); // Failed to set system environment variable
        }
    });

// 获取环境变量 (Get environment variable)
const value = getEnvVariable('KEY');
console.log('环境变量值:', value); // Value of environment variable

// 备份环境变量 (Backup environment variables)
backupEnv()
    .then((backupPath) => {
        console.log('环境变量备份路径:', backupPath); // Environment variables backed up to
    });

// 恢复环境变量 (Restore environment variables)
restoreEnv('/path/to/backup')
    .then((restoredVariables) => {
        console.log('恢复的环境变量:', restoredVariables); // Restored environment variables
    });
```

## License 许可

Copyright (c) 2023 team@byteforge.cn

Licensed under the [MIT License](LICENSE).
