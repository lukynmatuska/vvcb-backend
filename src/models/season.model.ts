import { Model, ObjectID, Unique } from "@tsed/mongoose";
import { Default, Enum, Property, ReadOnly, Required } from "@tsed/schema";

@Model({
  name: "seasons"
})
export class SeasonModel {
  @ReadOnly()
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  @Unique()
  name: string;

  @Property()
  @Enum('archived', 'active', 'prepared')
  @Default('prepared')
  status: string;
}
