import { Model, ObjectID } from "@tsed/mongoose";
import { Property, ReadOnly, Required } from "@tsed/schema";

@Model({
  name: "rules"
})
export class RulesModel {
  @ReadOnly()
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  name: string;

  @Property()
  description: string;
}
