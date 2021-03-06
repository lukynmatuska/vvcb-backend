import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { CategoryModel } from "src/models/category.model";
import { WebSocketService } from "./web-socket.service";

@Injectable()
export class CategoryService {
    constructor(
        @Inject(CategoryModel) private model: MongooseModel<CategoryModel>,
        @Inject(WebSocketService) private webSocketService: WebSocketService
    ) {

    }

    async save(obj: CategoryModel) {
        const doc = new this.model(obj);
        await doc.save();
        this.webSocketService.broadcast("new-category", doc);
        return doc;
    }

    async getAll() {
        return await this.model.find().sort('name').exec();
    }

    async findById(id: string) {
        return await this.model.findById(id).exec();
    }

    async deleteById(id: string) {
        const category = await this.model.findOneAndDelete({ _id: id });
        this.webSocketService.broadcast("delete-category", category);
        return category;
    }
}
