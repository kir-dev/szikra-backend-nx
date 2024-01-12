import * as dotenv from 'dotenv';
import * as env from 'env-var';
dotenv.config();

type ServiceConfig = {
  host: string;
  port: number;
};

export type ClientProxyOptions = {
  memberService: ServiceConfig;
  authorizationService: ServiceConfig;
  communityService: ServiceConfig;
  roleService: ServiceConfig;
  userService: ServiceConfig;
};

export class ConfigService {
  private readonly envConfig: ServiceConfig &
    ClientProxyOptions & {
      frontendUrl: string;
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
      roleService: {
        host: env.get('ROLE_SERVICE_HOST').required().asString(),
        port: env.get('ROLE_SERVICE_PORT').required().asPortNumber(),
      },
      userService: {
        host: env.get('USER_SERVICE_HOST').required().asString(),
        port: env.get('USER_SERVICE_PORT').required().asPortNumber(),
      },
      frontendUrl: env.get('FRONTEND_URL').required().asString(),
    };
  }

  get<T extends keyof typeof this.envConfig>(
    key: T,
  ): (typeof this.envConfig)[T] {
    return this.envConfig[key];
  }
}
