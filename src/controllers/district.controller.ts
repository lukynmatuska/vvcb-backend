import { BodyParams, Controller, Delete, Get, Inject, PathParams, Post } from "@tsed/common";
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
  @Returns(200, Array).Of(DistrictModel)
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

  @ContentType("application/json")
  @Delete("/:id")
  @Summary("Delete district by ID")
  @Description("Returns deleted district with given id from database.")
  @Returns(200, DistrictModel)
  @Returns(404).Description("Not found")
  async deleteById(@PathParams("id") id: string) {
    return await this.districtService.deleteById(id);
  }
}
