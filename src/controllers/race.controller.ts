import { Inject } from "@tsed/di";
import { BodyParams, Controller, Delete, Get, PathParams, Post } from "@tsed/common";
import { RaceService } from "src/services/race.service";
import { ContentType, Description, Returns, Summary } from "@tsed/schema";
import { RaceModel } from "src/models/race.model";

@Controller("/race")
export class RaceController {
  @Inject()
  raceService: RaceService;

  @ContentType('aplication/json')
  @Post('/')
  @Summary('Create new race')
  @Description('Return an created object from database.')
  @Returns(200, RaceModel)
  async createRace(@BodyParams() race: RaceModel) {
    return await this.raceService.save(race);
  }

  @ContentType('application/json')
  @Get("/")
  @Summary('Get all races')
  @Description('Return list of all races.')
  @Returns(200, Array).Of(RaceModel)
  async getAllRaces() {
    return await this.raceService.getAll();
  }

  @ContentType('application/json')
  @Get('/:id')
  @Summary('Get one race by id')
  @Description('Return a race with given id from database.')
  @Returns(200, RaceModel)
  @Returns(404).Description('Not found')
  async getRaceById(@PathParams('id') id: string) {
    return await this.raceService.findById(id);
  }

  @ContentType("application/json")
  @Delete("/:id")
  @Summary("Delete one race by ID")
  @Description("Return deleted race with given id from database.")
  @Returns(200, RaceModel)
  @Returns(404).Description("Not found")
  async deleteById(@PathParams("id") id: string) {
    return await this.raceService.deleteById(id);
  }
}
