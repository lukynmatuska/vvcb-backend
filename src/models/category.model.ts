import { Model, Unique, ObjectID } from "@tsed/mongoose";
import { Property, ReadOnly, Required } from "@tsed/schema";

@Model()
export class CategoryModel {
  @ReadOnly()
  @ObjectID('_id')
  _id: string;

  @Property()
  @Required()
  @Unique()
  name: string;
}
