import { Model, ObjectID } from "@tsed/mongoose";
import { Default, Format, Property, ReadOnly, Required } from "@tsed/schema";
import { TimeTemplate } from "./time.class";

@Model({
  name: "resultTemplates"
})
export class ResultTemplateModel {
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  time: TimeTemplate;

  @Property()
  @Format("date-time")
  @Default(Date.now)
  date: Date;
}
