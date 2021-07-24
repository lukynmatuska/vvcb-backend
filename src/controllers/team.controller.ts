import { Inject } from "@tsed/di";
import { BodyParams, Controller, Get, PathParams, Post } from "@tsed/common";
import { ContentType, Description, Returns, Summary } from "@tsed/schema";
import { TeamModel } from "src/models/team.model";
import { TeamService } from "src/services/team.service";

@Controller('/team')
export class TeamController {
  @Inject()
  teamService: TeamService;
  @ContentType('application/json')
  @Post('/')
  @Summary('Create new team')
  @Description('Return an inserted team from database.')
  @Returns(200, TeamModel)
  async postRoot(@BodyParams() team: TeamModel) {
    return await this.teamService.save(team);
  }

  @ContentType('application/json')
  @Get('/')
  @Summary('Get all teams')
  @Description('Return list with all teams.')
  @Returns(200, Array).Of(TeamModel)
  async getAll() {
    return await this.teamService.getAll();
  }

  @ContentType('application/json')
  @Get('/:id')
  @Summary('Get one team by ID')
  @Description('Return an team with given id from database.')
  @Returns(200, TeamModel)
  @Returns(404).Description("Not found")
  async getRoot(@PathParams('id') id: string) {
    return await this.teamService.findById(id);
  }
}
