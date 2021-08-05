import { Inject } from "@tsed/di";
import { BodyParams, Controller, Delete, Get, PathParams, Post } from "@tsed/common";
import { RulesService } from "src/services/rules.service";
import { ContentType, Description, Returns, Summary } from "@tsed/schema";
import { RulesModel } from "src/models/rules.model";

@Controller("/rules")
export class RulesController {
  @Inject()
  rulesService: RulesService;

  @ContentType('application/json')
  @Post('/')
  @Summary('Create new rules')
  @Description('Return an created object from database.')
  @Returns(200, RulesModel)
  async createNewRules(@BodyParams() rules: RulesModel) {
    return await this.rulesService.save(rules);
  }

  @ContentType('application/json')
  @Get('/')
  @Summary('Get all rules')
  @Description('Return list of all rules.')
  @Returns(200, Array).Of(RulesModel)
  async getAll() {
    return await this.rulesService.getAll();
  }

  @ContentType('application/json')
  @Get('/:id')
  @Summary('Get rules by id')
  @Description('Return rules with given id from database.')
  @Returns(200, RulesModel)
  @Returns(404).Description('Not found')
  async getRulesById(@PathParams('id') id: string) {
    return await this.rulesService.findById(id);
  }

  @ContentType("application/json")
  @Delete("/:id")
  @Summary("Delete one rules with given ID")
  @Description("Returns deleted rules with given id from database.")
  @Returns(200, RulesModel)
  @Returns(404).Description("Not found")
  async deleteById(@PathParams("id") id: string) {
    return await this.rulesService.deleteById(id);
  }
}
