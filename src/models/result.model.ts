import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { Default, Format, Property, Required } from "@tsed/schema";
import { RaceModel } from "./race.model";
import { TeamModel } from "./team.model";
import { Time } from "./time.class";

@Model({
  name: "results"
})
export class ResultModel {
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  time: Time;

  @Property()
  @Required()
  @Ref(TeamModel)
  team: Ref<TeamModel>

  @Property()
  @Required()
  @Ref(RaceModel)
  race: Ref<RaceModel>

  @Property()
  @Format("date-time")
  @Default(Date.now)
  date: Date;

  @Property()
  media: {
    youtube: string;
  }
}
