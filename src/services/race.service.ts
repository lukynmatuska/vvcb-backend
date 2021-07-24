import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { RaceModel } from "src/models/race.model";

@Injectable()
export class RaceService {
    constructor(@Inject(RaceModel) private model: MongooseModel<RaceModel>) {

    }

    async save(obj: RaceModel): Promise<MongooseModel<RaceModel>> {
        const doc = new this.model(obj);
        await doc.save();
        return doc;
    }

    async getAll() {
        return await this.model.find().exec();
    }

    async findById(id: string) {
        return await this.model.findById(id).exec();
    }
}
