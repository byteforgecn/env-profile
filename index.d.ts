export declare function getOSType(): string;
export declare function setUserEnv(key: string, value: string): Promise<{ success: boolean; key: string; value: string; error?: string }>;
export declare function setSysEnv(key: string, value: string): Promise<{ success: boolean; key: string; value: string; error?: string }>;
export declare function getEnvVariable(key: string): string | undefined;
export declare function backupEnv(): Promise<string>;
export declare function restoreEnv(backupPath: string): Promise<{ [key: string]: string }>;
