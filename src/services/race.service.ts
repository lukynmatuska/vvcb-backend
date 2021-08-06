import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import moment from "moment";
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
            .populate("categories.category")
            .populate("categories.rules")
            .populate("reservations.team")
            .execPopulate();
        this.webSocketService.broadcast("new-race", race);
        return race;
    }

    async getAll() {
        return await this.model
            .find()
            .populate("season")
            .populate("categories.category")
            .populate("categories.rules")
            .populate("reservations.team")
            .exec();
    }

    async findById(id: string) {
        return await this.model
            .findById(id)
            .populate("season")
            .populate("categories.category")
            .populate("categories.rules")
            .populate("reservations.team")
            .exec();
    }

    async deleteById(id: string) {
        const race = await this.model
            .findOneAndDelete({ _id: id })
            .populate("season")
            .populate("categories.category")
            .populate("categories.rules")
            .populate("reservations.team")
            .exec();
        this.webSocketService.broadcast("delete-race", race);
        return race;
    }

    async forMonitors() {
        let d = new Date();
        d.setHours(d.getHours() - 12);
        const race = await this.model
            .find({
                date: {
                    $gte: d
                }
            })
            .populate("season")
            .populate("categories.category")
            .populate("categories.rules")
            .populate("reservations.team")
            .sort({
                date: 1
            })
            .limit(1)
            .exec();
        console.log(race[0]);
        return race[0];
    }
}
