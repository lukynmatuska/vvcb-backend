import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { Default, Format, Property, ReadOnly, Required } from "@tsed/schema";
import { RaceModel } from "./race.model";
import { TeamModel } from "./team.model";

@Model({
  name: "results"
})
export class ResultModel {
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
