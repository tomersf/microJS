export class Env {
    static validateEnvVariables(...envs: string[]) {
        for (const env of envs) {
            if (!process.env[env]) {
                throw new Error(`${env} must be defined`);
            }
        }
    }
    static get(env: string) {
        if (!process.env[env]) {
            return ''
        }
        return process.env[env]!;
    }

    static set(envName: string, value: string) {
        process.env[envName] = value;
    }

    static setMultiple(envs: Record<string, string>) {
        for (const [key, value] of Object.entries(envs)) {
            process.env[key] = value;
        }
    }
}

