import { Inject } from "@tsed/di";
import { BodyParams, Controller, Delete, Get, PathParams, Post } from "@tsed/common";
import { ContentType, Description, Path, Returns, Summary } from "@tsed/schema";
import { SeasonModel } from "src/models/season.model";
import { SeasonService } from "src/services/season.service";

@Controller("/season")
export class SeasonController {
  @Inject()
  seasonService: SeasonService;

  @ContentType('application/json')
  @Post('/')
  @Summary('Create new season')
  @Description('Return an created object from database')
  @Returns(200, SeasonModel)
  async createSeason(@BodyParams() season: SeasonModel) {
    return await this.seasonService.save(season);
  }

  @ContentType('application/json')
  @Get('/')
  @Summary('Get all seasons')
  @Description('Return list of all seasons.')
  @Returns(200, Array).Of(SeasonModel)
  async getAllSeasons() {
    return await this.seasonService.getAll();
  }

  @ContentType('application/json')
  @Get('/:id')
  @Summary('Get one season by id')
  @Description('Return a season with given id from database.')
  @Returns(200, SeasonModel)
  @Returns(404).Description('Not found')
  async getSeasonById(@PathParams('id') id: string) {
    return await this.seasonService.findById(id);
  }

  @ContentType("application/json")
  @Delete("/:id")
  @Summary("Delete one season by id")
  @Description("Returns deleted season with given id from database.")
  @Returns(200, SeasonModel)
  @Returns(404).Description("Not found")
  async deleteById(@PathParams("id") id: string) {
    return await this.seasonService.deleteById(id);
  }
}
