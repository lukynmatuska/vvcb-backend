import { BodyParams, Controller, Delete, Get, Inject, PathParams, Post } from "@tsed/common";
import { ContentType, Description, Returns, Summary } from "@tsed/schema";
import { ResultTemplateModel } from "src/models/result-template.model";
import { ResultTemplateService } from "src/services/result-template.service";

@Controller("/result-template")
export class ResultTemplateController {
  @Inject()
  resultTemplateService: ResultTemplateService;

  @ContentType("application/json")
  @Post("/")
  @Summary("Create new result template")
  @Description("Return an inserted object from database.")
  @Returns(200, ResultTemplateModel)
  async postRoot(@BodyParams() resultTemplate: ResultTemplateModel) {
    console.log(resultTemplate);
    return await this.resultTemplateService.save(resultTemplate);
  }

  @ContentType("application/json")
  @Get("/")
  @Summary("Get all result templates")
  @Description("Return list of all result templates.")
  @Returns(200, Array).Of(ResultTemplateModel)
  async getAll() {
    return await this.resultTemplateService.getAll();
  }

  @ContentType("application/json")
  @Get("/:id")
  @Summary("Get one result template by ID")
  @Description("Return an result template with given id from database.")
  @Returns(200, ResultTemplateModel)
  @Returns(404).Description("Not found")
  async getById(@PathParams("id") id: string) {
    return await this.resultTemplateService.findById(id);
  }

  @ContentType("application/json")
  @Delete("/:id")
  @Summary("Delete one result template by ID")
  @Description("Return an result template with given id deleted from database.")
  @Returns(200, ResultTemplateModel)
  @Returns(404).Description("Not found")
  async deleteById(@PathParams("id") id: string) {
    return await this.resultTemplateService.deleteById(id);
  }
}
