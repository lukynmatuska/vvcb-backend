import { Unique, Model, ObjectID, Ref } from "@tsed/mongoose";
import { Property, ReadOnly, Required } from "@tsed/schema";
import { CategoryModel } from "./category.model";

@Model({
  name: 'teams'
})
export class TeamModel {
  @ReadOnly()
  @ObjectID('id')
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
