import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { TeamModel } from "src/models/team.model";

@Injectable()
export class TeamService {
    constructor(@Inject(TeamModel) private model: MongooseModel<TeamModel>) {

    }

    async save(obj: TeamModel): Promise<MongooseModel<TeamModel>> {
        const doc = new this.model(obj);
        await doc.save();
        return doc;
    }

    async getAll() {
        const list = await this.model.find().exec();
        return list;
    }

    async findById(id: string) {
        const one = await this.model.findById(id).exec();
        return one;
    }

}
