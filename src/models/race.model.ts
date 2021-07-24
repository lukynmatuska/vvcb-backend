import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { Property, ReadOnly, Required } from "@tsed/schema";
import { CategoryModel } from "./category.model";
import { RulesModel } from "./rules.model";
import { SeasonModel } from "./season.model";

@Model({
  name: "races"
})
export class RaceModel {
  @ReadOnly()
  @ObjectID("id")
  _id: string;

  @Property()
  @Required()
  name: string;

  @Property()
  @Required()
  @Ref(SeasonModel)
  season: Ref<SeasonModel>

  @Property()
  @Required()
  categories: [{
    category: Ref<CategoryModel>,
    rules: Ref<RulesModel>
  }]

}
