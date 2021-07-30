import { Model, ObjectID } from "@tsed/mongoose";
import { Default, Format, Property, ReadOnly, Required } from "@tsed/schema";
import { Time } from "./time.class";

@Model({
  name: "resultTemplates"
})
export class ResultTemplateModel {
  @ReadOnly()
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  time: Time;

  @Property()
  @Format("date-time")
  @Default(Date.now)
  date: Date;
}
