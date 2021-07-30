import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { RulesModel } from "src/models/rules.model";

@Injectable()
export class RulesService {
    constructor(@Inject(RulesModel) private model: MongooseModel<RulesModel>) {

    }

    async save(obj: RulesModel) {
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
