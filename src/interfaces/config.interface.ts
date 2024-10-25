export interface DBConfig {
    mongo: {
        uri: string | null;
    };
}

export interface Config {
    BACKPORT: string | undefined;
    PORT: string | undefined;
    MONGO_URI: string | undefined;
    DATABASE: string | undefined;
    DB_PASSWORD: string | undefined;
    ADMIN_NAME: string | undefined;
    ADMIN_PASSWORD: string | undefined;
    DATA_SOURCE: string | undefined;
    JWT_SECRET: string;
    SESSION_KEY: string;
    EMAIL: string | undefined;
    EMAIL_PASSWORD: string | undefined;
    TEST_DATABASE: string | undefined;
    NODE_ENV: string | undefined;
}
