import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { ResultModel } from "src/models/result.model";

@Injectable()
export class ResultService {
    constructor(@Inject(ResultModel) private model: MongooseModel<ResultModel>) {

    }

    async save(obj: ResultModel) {
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
