import {Constant, Controller, Get, HeaderParams, View} from "@tsed/common";
import {Hidden, SwaggerSettings} from "@tsed/swagger";

@Controller("/")
export class IndexCtrl {
  @Constant("swagger")
  swagger: SwaggerSettings[];
}
