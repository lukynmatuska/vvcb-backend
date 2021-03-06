import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { RulesModel } from "src/models/rules.model";
import { WebSocketService } from "./web-socket.service";

@Injectable()
export class RulesService {
    constructor(
        @Inject(RulesModel) private model: MongooseModel<RulesModel>,
        @Inject(WebSocketService) private webSocketService: WebSocketService
    ) {

    }

    async save(obj: RulesModel) {
        const doc = new this.model(obj);
        await doc.save();
        this.webSocketService.broadcast("new-rules", doc);
        return doc;
    }

    async getAll() {
        return await this.model.find().sort('name').exec();
    }

    async findById(id: string) {
        return await this.model.findById(id).exec();
    }

    async deleteById(id: string) {
        const rules = await this.model.findOneAndDelete({ _id: id });
        this.webSocketService.broadcast("delete-rules", rules);
        return rules;
    }
}
