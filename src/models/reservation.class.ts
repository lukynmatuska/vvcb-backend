import { Ref } from "@tsed/mongoose";
import { Property } from "@tsed/schema";
import { TeamModel } from "./team.model";

export class Reservation {
    @Property()
    @Ref(TeamModel)
    team: Ref<TeamModel>;

    @Property()
    order: Number;
}