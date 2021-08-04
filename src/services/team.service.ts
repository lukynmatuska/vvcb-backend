import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { TeamModel } from "src/models/team.model";

@Injectable()
export class TeamService {
    constructor(@Inject(TeamModel) private model: MongooseModel<TeamModel>) {

    }

    async save(obj: TeamModel) {
        const doc = new this.model(obj);
        await doc.save();
        return doc;
    }

    async getAll() {
        return await this.model
            .find()
            .populate("category")
            .populate("district")
            .exec();
    }

    async findById(id: string) {
        return await this.model
            .findById(id)
            .populate("category")
            .populate("district")
            .exec();
    }

}
