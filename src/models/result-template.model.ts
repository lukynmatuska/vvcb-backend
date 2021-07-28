import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { Default, Format, Property, ReadOnly, Required } from "@tsed/schema";

@Model({
  name: "resultTemplates"
})
export class ResultTemplateModel {
  @ReadOnly()
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  time: {
    final: Number,
    left: Number,
    right: Number,
  }

  @Property()
  @Format("date-time")
  @Default(Date.now)
  date: Date;
}
