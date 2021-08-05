import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { SeasonModel } from "src/models/season.model";
import { WebSocketService } from "./web-socket.service";

@Injectable()
export class SeasonService {
    constructor(
        @Inject(SeasonModel) private model: MongooseModel<SeasonModel>,
        @Inject(WebSocketService) private webSocketService: WebSocketService
    ) {

    }

    async save(obj: SeasonModel) {
        const doc = new this.model(obj);
        await doc.save();
        this.webSocketService.broadcast("new-season", doc);
        return doc;
    }

    async getAll() {
        return await this.model.find().exec();
    }

    async findById(id: string) {
        return await this.model.findById(id).exec();
    }
}