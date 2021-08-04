import { BodyParams, Controller, Get, Inject, PathParams, Post } from "@tsed/common";
import { ContentType, Description, Returns, Summary } from "@tsed/schema";
import { DistrictModel } from "src/models/district.model";
import { DistrictService } from "src/services/district.service";

@Controller("/district")
export class DistrictController {
  @Inject()
  districtService: DistrictService;

  @ContentType("application/json")
  @Post("/")
  @Summary("Create new district")
  @Description("Returns an insterted district from database.")
  @Returns(200, DistrictModel)
  async postRoot(@BodyParams() district: DistrictModel) {
    return await this.districtService.save(district);
  }

  @ContentType("application/json")
  @Get("/")
  @Summary("Get all districts")
  @Description("Returns list of all districts")
  @Returns(200, Array).of(DistrictModel)
  async getAll() {
    return await this.districtService.getAll();
  }

  @ContentType("application/json")
  @Get("/:id")
  @Summary("Get one district by ID")
  @Description("Returns an district with given id from databse.")
  @Returns(200, DistrictModel)
  @Returns(404).Description("Not found")
  async findById(@PathParams("id") id: string) {
    return await this.districtService.findById(id);
  }
}
