import { Env } from '@tomersftickets/common'

export interface EnvVars {
    JWT_KEY: string;
    DB_URL: string;
    NODE_ENV: string
    NATS_CLUSTER_ID: string;
    NATS_CLIENT_ID: string;
    NATS_URL: string;
}

export type EnvVarsKeys = keyof EnvVars;

export const dummyEnvVars: EnvVars = {
    DB_URL: '',
    JWT_KEY: '',
    NODE_ENV: '',
    NATS_CLUSTER_ID: '',
    NATS_CLIENT_ID: '',
    NATS_URL: ''
}

export function validateEnvVariables() {
    let keys = []
    for (const key in dummyEnvVars) {
        keys.push(key)
    }
    Env.validateEnvVariables(...keys)
}

export function getEnv(key: EnvVarsKeys) {
    return Env.get(key)
}

export function setEnv(key: EnvVarsKeys, value: string) {
    Env.set(key, value)
}

