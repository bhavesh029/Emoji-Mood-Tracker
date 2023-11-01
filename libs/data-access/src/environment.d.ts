declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROFILE: string;
      DATABASE_URL: string;
      DB_SCHEMA: string;
      TIMEZONE: string;
    }
  }
}

export {};
