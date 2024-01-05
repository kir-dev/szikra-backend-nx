import * as dotenv from 'dotenv';
import * as env from 'env-var';
dotenv.config();

export class ConfigService {
  private readonly envConfig: {
    host: string;
    port: number;
    oauth2: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
    };
    superuserId?: string;
  };

  constructor() {
    this.envConfig = {
      host: env.get('HOST').required().asString(),
      port: env.get('PORT').required().asPortNumber(),
      oauth2: {
        clientId: env.get('GOOGLE_CLIENT_ID').required().asString(),
        clientSecret: env.get('GOOGLE_CLIENT_SECRET').required().asString(),
        redirectUri: env.get('LOGIN_REDIRECT_URI').required().asString(),
      },
      superuserId: env.get('SUPERUSER_ID').asString(),
    };
  }

  get<T extends keyof typeof this.envConfig>(
    key: T,
  ): (typeof this.envConfig)[T] {
    return this.envConfig[key];
  }
}
