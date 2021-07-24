import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import {config, rootDir} from "./config";
import {IndexCtrl} from "./controllers/pages/Index.controller";
import { KeycloakService } from "./services/Keycloak.service";
import session from "express-session";
import "@tsed/socketio";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    "/rest": [
      `${rootDir}/controllers/**/*.ts`
    ],
    "/": [IndexCtrl]
  },
  swagger: [
    {
      path: "/v3/docs",
      specVersion: "3.0.1",
      spec: {
        components: {
          securitySchemes: {
            "oauth2": {
              type: "oauth2",
              flows: {
                authorizationCode: {
                  authorizationUrl: "https://id.matejbucek.cz/auth/realms/SvelteSSO/protocol/openid-connect/auth",
                  tokenUrl: "https://id.matejbucek.cz/auth/realms/SvelteSSO/protocol/openid-connect/token",
                  refreshUrl: "https://id.matejbucek.cz/auth/realms/SvelteSSO/protocol/openid-connect/token",
                  scopes: {openid: "openid", profile: "profile"}
                }
              }
            }
          }
        }
      }
    }
  ],
  views: {
    root: `${rootDir}/../views`,
    viewEngine: "ejs"
  },
  exclude: [
    "**/*.spec.ts"
  ],
  socketIO: {
    path: "/ws"
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Inject()
  keycloakService: KeycloakService;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }))
      .use(session(
        {
          secret: "some-secret",
          resave: false,
          saveUninitialized: true,
          store: this.keycloakService.getMemoryStore()
        }
      ))
      .use(this.keycloakService.getKeycloakInstance().middleware());
  }
}
