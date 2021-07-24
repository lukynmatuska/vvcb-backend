import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { CategoryModel } from "src/models/category.model";

@Injectable()
export class CategoryService {
    constructor(@Inject(CategoryModel) private model: MongooseModel<CategoryModel>) {

    }

    async save(obj: CategoryModel): Promise<MongooseModel<CategoryModel>> {
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
