import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { CollectionOf, Property, Required } from "@tsed/schema";
import { RaceCategory } from "./raceCategory.model";
import { Reservation } from "./reservation.class";
import { SeasonModel } from "./season.model";

@Model({
  name: "races"
})
export class RaceModel {
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  name: string;

  @Property()
  @Required()
  date: Date;

  @Property()
  @Required()
  @Ref(SeasonModel)
  season: Ref<SeasonModel>

  @Property()
  @Required()
  @CollectionOf(RaceCategory)
  categories: RaceCategory[];

  @Property()
  @CollectionOf(Reservation)
  reservations: Reservation[];

}
