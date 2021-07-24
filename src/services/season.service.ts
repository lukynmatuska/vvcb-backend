import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { SeasonModel } from "src/models/season.model";

@Injectable()
export class SeasonService {
    constructor(@Inject(SeasonModel) private model: MongooseModel<SeasonModel>) {

    }

    async save(obj: SeasonModel): Promise<MongooseModel<SeasonModel>> {
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