import { Controller, Get, Inject } from "@tsed/common";
import { ContentType, Description, Returns, Summary } from "@tsed/schema";
import { RaceService } from "src/services/race.service";

@Controller("/monitors")
export class MonitorsController {
  @Inject()
  raceService: RaceService;

  @ContentType('application/json')
  @Get("/")
  @Summary("Get initial data for monitors")
  @Description("Returns object for monitors.")
  @Returns(200, Object)
  async get() {
    return {
      race: await this.raceService.forMonitors(),
    };
  }
}
