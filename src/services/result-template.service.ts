import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { ResultTemplateModel } from "src/models/result-template.model";
import { WebSocketService } from "./web-socket.service";

@Injectable()
export class ResultTemplateService {
    constructor(
        @Inject(ResultTemplateModel) private model: MongooseModel<ResultTemplateModel>,
        @Inject(WebSocketService) private wss: WebSocketService
    ) {

    }

    async save(obj: ResultTemplateModel) {
        const doc = new this.model(obj);
        await doc.save()
        this.wss.broadcast("new-result-template", doc);
        return doc;
    }

    async getAll() {
        return await this.model.find().exec();
    }

    async findById(id: string) {
        return await this.model.findById(id).exec();
    }

    async deleteById(id: string) {
        const doc = await this.model.deleteOne({ _id: id }).exec();
        this.wss.broadcast("delete-result-template", doc);
        return doc;
    }
}
