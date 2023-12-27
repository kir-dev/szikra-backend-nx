import * as dotenv from 'dotenv';
import * as env from 'env-var';
dotenv.config();

export class ConfigService {
  private readonly envConfig: {
    host: string;
    port: number;
    memberService: {
      host: string;
      port: number;
    };
    authorizationService: {
      host: string;
      port: number;
    };
    communityService: {
      host: string;
      port: number;
    };
  };

  constructor() {
    this.envConfig = {
      host: env.get('HOST').required().asString(),
      port: env.get('PORT').required().asPortNumber(),
      memberService: {
        host: env.get('MEMBER_SERVICE_HOST').required().asString(),
        port: env.get('MEMBER_SERVICE_PORT').required().asPortNumber(),
      },
      authorizationService: {
        host: env.get('AUTHORIZATION_SERVICE_HOST').required().asString(),
        port: env.get('AUTHORIZATION_SERVICE_PORT').required().asPortNumber(),
      },
      communityService: {
        host: env.get('COMMUNITY_SERVICE_HOST').required().asString(),
        port: env.get('COMMUNITY_SERVICE_PORT').required().asPortNumber(),
      },
    };
  }

  get<T extends keyof typeof this.envConfig>(
    key: T,
  ): (typeof this.envConfig)[T] {
    return this.envConfig[key];
  }
}
