import { Controller, Get } from "@tsed/common";
import { KeycloakAuth } from "src/decorators/KeycloakAuthOptions.decorator";

@Controller("/")
export class RestController {

  @Get("/protected")
  @KeycloakAuth({ role: "realm:user" })
  protected() {
    return { "test": "ahoj" };
  }
}
