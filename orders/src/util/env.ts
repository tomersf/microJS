import { Env } from '@tomersftickets/common'


export interface EnvVarsRequired {
    JWT_KEY: string;
    DB_URL: string;
    NODE_ENV: string
    NATS_CLUSTER_ID: string;
    NATS_CLIENT_ID: string;
    NATS_URL: string;
}

interface EnvVarsOptional {
    EXPIRATION_TIME_IN_SECONDS?: string;
}

interface EnvVars extends EnvVarsRequired, EnvVarsOptional { }

const defaultOptionalEnvsValue: Required<EnvVarsOptional> = {
    EXPIRATION_TIME_IN_SECONDS: (15 * 60).toString()
}

export type EnvVarsKeys = keyof EnvVars;

export const dummyEnvVars: EnvVars = {
    DB_URL: '',
    JWT_KEY: '',
    NODE_ENV: '',
    NATS_CLUSTER_ID: '',
    NATS_CLIENT_ID: '',
    NATS_URL: '',
}

export function validateEnvVariables() {
    let keys = []
    for (const key in dummyEnvVars) {
        keys.push(key)
    }
    Env.validateEnvVariables(...keys)
    for (const key in defaultOptionalEnvsValue) {
        if (!getEnv(key as keyof EnvVarsOptional)) {
            setEnv(key as keyof EnvVars, defaultOptionalEnvsValue[key as keyof EnvVarsOptional])
        }
    }
}

export function getEnv(key: EnvVarsKeys) {
    return Env.get(key)
}

export function setEnv(key: EnvVarsKeys, value: string) {
    Env.set(key, value)
}

