import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { DistrictModel } from "src/models/district.model";

@Injectable()
export class DistrictService {
    constructor(@Inject(DistrictModel) private model: MongooseModel<DistrictModel>) {

    }

    async save(obj: DistrictModel) {
        const doc = new this.model(obj);
        await doc.save();
        return doc;
    }

    async getAll() {
        return await this.model.find();
    }

    async findById(id: string) {
        return await this.model.findById(id);
    }

}
