interface EnvVars {
    JWT_KEY: string
}

type KeysEnum<T> = {
    [K in keyof T]: boolean
}

const envKeys: KeysEnum<EnvVars> = {
    JWT_KEY: true,
}

class Env {
    static validateEnvVariables() {
        for (const [key, value] of Object.entries(envKeys)) {
            if (value && !process.env[key]) {
                throw new Error(`${key} must be defined`);
            }
        }
    }
    static get(env: keyof EnvVars) {
        if (!process.env[env]) {
            throw new Error(`${env} must be defined`);
        }
        return process.env[env]!;
    }
}

export default Env;
