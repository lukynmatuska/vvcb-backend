import { Ref } from "@tsed/mongoose";
import { Property, Required } from "@tsed/schema";
import { CategoryModel } from "./category.model";
import { RulesModel } from "./rules.model";

export class RaceCategory {
    @Property()
    @Required()
    @Ref(CategoryModel)
    category: Ref<CategoryModel>;

    @Property()
    @Required()
    @Ref(RulesModel)
    rules: Ref<RulesModel>;
}