import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { Property, Required } from "@tsed/schema";
import { CategoryModel } from "./category.model";
import { DistrictModel } from "./district.model";

@Model({
  name: 'teams'
})
export class TeamModel {
  @ObjectID('id')
  _id: string;

  @Property()
  @Required()
  name: string;

  @Property()
  @Required()
  @Ref(CategoryModel)
  category: Ref<CategoryModel>

  @Property()
  @Required()
  @Ref(DistrictModel)
  district: Ref<DistrictModel>;
}
