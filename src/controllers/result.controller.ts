import { BodyParams, Controller, Get, Inject, PathParams, Post } from "@tsed/common";
import { ContentType, Description, Returns, Summary } from "@tsed/schema";
import { ResultModel } from "src/models/result.model";
import { ResultService } from "src/services/result.service";

@Controller("/result")
export class ResultController {
  @Inject()
  resultService: ResultService;

  @ContentType("application/json")
  @Post("/")
  @Summary("Create new result")
  @Description("Return an inserted object from database.")
  @Returns(200, ResultModel)
  async postRoot(@BodyParams() result: ResultModel) {
    return await this.resultService.save(result);
  }

  @ContentType("application/json")
  @Get("/")
  @Summary("Get all results")
  @Description("Return list of all results.")
  @Returns(200, Array).Of(ResultModel)
  async getAll() {
    return await this.resultService.getAll();
  }

  @ContentType("application/json")
  @Get("/:id")
  @Summary("Get one result by ID")
  @Description("Return an result with given id from database.")
  @Returns(200, ResultModel)
  @Returns(404).Description("Not found")
  async getById(@PathParams("id") id: string) {
    return await this.resultService.findById(id);
  }
}
