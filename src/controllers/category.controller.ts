import { Inject } from "@tsed/di";
import { BodyParams, Controller, Get, PathParams, Post } from "@tsed/common";
import { ContentType, Description, Returns, Summary } from "@tsed/schema";
import { CategoryService } from "src/services/category.service";
import { CategoryModel } from "src/models/category.model";

@Controller('/category')
export class CategoryController {
  @Inject()
  categoryService: CategoryService;

  @ContentType('application/json')
  @Post('/')
  @Summary('Create new category')
  @Description('Return an created object from database.')
  @Returns(200, CategoryModel)
  async postRoot(@BodyParams() category: CategoryModel) {
    return await this.categoryService.save(category);
  }

  @ContentType('application/json')
  @Get('/')
  @Summary('Get all categories')
  @Description('Return list of all categories.')
  @Returns(200, Array).Of(CategoryModel)
  async getAll() {
    return await this.categoryService.getAll();
  }

  @ContentType('application/json')
  @Get('/:id')
  @Summary('Get one category by id')
  @Description('Return an category with given id from database.')
  @Returns(200, CategoryModel)
  @Returns(404).Description("Not found")
  async getRoot(@PathParams('id') id: string) {
    return await this.categoryService.findById(id);
  }
}
