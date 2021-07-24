import { Unique, Model, ObjectID, Ref } from "@tsed/mongoose";
import { Property, ReadOnly, Required } from "@tsed/schema";
import { CategoryModel } from "./category.model";

@Model()
export class TeamModel {
  @ReadOnly()
  @ObjectID('_id')
  _id: string;

  @Property()
  @Required()
  @Unique()
  name: string;

  @Property()
  @Required()
  @Ref(CategoryModel)
  category: Ref<CategoryModel>
}
