import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { ResultTemplateModel } from "src/models/result-template.model";

@Injectable()
export class ResultTemplateService {
    constructor(@Inject(ResultTemplateModel) private model: MongooseModel<ResultTemplateModel>) {

    }

    async save(obj: ResultTemplateModel) {
        const doc = new this.model(obj);
        await doc.save()
        return doc;
    }

    async getAll() {
        return await this.model.find().exec();
    }

    async findById(id: string) {
        return await this.model.findById(id).exec();
    }

    async deleteById(id: string) {
        return await this.model.deleteOne({ id }).exec();
    }
}
