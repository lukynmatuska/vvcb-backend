import { Model, Unique, ObjectID } from "@tsed/mongoose";
import { CollectionOf, Property, Required } from "@tsed/schema";

@Model({
  name: 'categories'
})
export class CategoryModel {
  @ObjectID('id')
  _id: string;

  @Property()
  @Required()
  @Unique()
  name: string;

  @Property()
  @Required()
  @CollectionOf(Number)
  points: Number[];
}
