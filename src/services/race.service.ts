import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { RaceModel } from "src/models/race.model";
import { WebSocketService } from "./web-socket.service";

@Injectable()
export class RaceService {
    constructor(
        @Inject(RaceModel) private model: MongooseModel<RaceModel>,
        @Inject(WebSocketService) private webSocketService: WebSocketService
    ) {

    }

    async save(obj: RaceModel) {
        const doc = new this.model(obj);
        let race = await doc.save();
        race = await race
            .populate("season")
            .execPopulate();
        this.webSocketService.broadcast("new-race", race);
        return race;
    }

    async getAll() {
        return await this.model
            .find()
            .populate("season")
            .exec();
    }

    async findById(id: string) {
        return await this.model
            .findById(id)
            .populate("season")
            .exec();
    }
}
