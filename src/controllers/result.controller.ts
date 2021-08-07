import { BodyParams, Controller, Delete, Get, Inject, Patch, PathParams, Post, QueryParams } from "@tsed/common";
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
  @Get("/filtred")
  @Summary("Get all results")
  @Description("Return list of all results.")
  @Returns(200, Array).Of(ResultModel)
  async getFilted(
    @QueryParams("raceId") raceId: string
  ) {
    return await this.resultService.getFiltred({
      race: raceId,
    });
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

  @ContentType("application/json")
  @Patch("/media/youtube")
  @Summary("Patch YouTube video link to result by ID")
  @Description("Return updated result with given id from database.")
  @Returns(200, ResultModel)
  @Returns(404).Description("Not found")
  async patchYouTubeLink(@BodyParams("id") id: string, @BodyParams("link") link: string) {
    return await this.resultService.patchYouTubeLink(id, link);
  }

  @ContentType("application/json")
  @Delete("/:id")
  @Summary("Delete one result by ID")
  @Description("Returns deleted result with given id from database.")
  @Returns(200, ResultModel)
  @Returns(404).Description("Not found")
  async deleteById(@PathParams("id") id: string) {
    return await this.resultService.deleteById(id);
  }
}
