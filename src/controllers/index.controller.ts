import { Constant, Controller, Get } from "@tsed/common";
import { ContentType, Description, Summary } from "@tsed/schema";
import { SwaggerSettings } from "@tsed/swagger";
import moment from "moment";

@Controller("/")
export class IndexController {
  @Constant("swagger")
  swagger: SwaggerSettings[];
  @ContentType('application/json')
  @Get("/")
  @Summary("Root route of the API")
  @Description("Return a message and time.")
  get() {
    return {
      message: "hello world!",
      time: moment()
    };
  }
}
