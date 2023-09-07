# env-profile

[![NPM](https://nodei.co/npm/env-profile.png?downloads=true&stars=true)](https://www.npmjs.com/package/env-profile)

> Do not use while still under development
>
> 仍在开发 请勿使用
>
> 开发计划解决path超出1024问题 1、打开Path，将所有路径备份下来2、新建一个新的环境变量：Path_User 3、我们操作变量就放在Path_User中，并且将%Path_User%加入到Path变量中。
> 
> 期待你的贡献, 欢迎所有人提交代码PR
> 
> Looking forward to your contribution, all people are welcome to submit code PR
> 
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
import { getOSType, setUserEnv, setSysEnv, getEnvVariable, backupEnv, restoreEnv, mergeUserEnv, mergeSysEnv } from 'env-profile';

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
// 合并用户环境变量 (Set user environment variable)
// 给类似"JAVA_HOME"的场景使用 Give a similar scenario USES JAVA "HOME"
mergeUserEnv('PATH', '%KEY%\\bin')
    .then((result) => {
        if (result.success) {
            console.log(`成功设置用户环境变量 ${result.key}=${result.value}`); // Successfully set user environment variable
        } else {
            console.error(`无法设置用户环境变量 ${result.key}=${result.value}: ${result.error}`); // Failed to set user environment variable
        }
    });

// 合并系统环境变量 (Set system environment variable) 
// 给类似"JAVA_HOME"的场景使用 Give a similar scenario USES JAVA "HOME"
mergeSysEnv('PATH', '%KEY%\\bin')
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
