import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { TeamModel } from "src/models/team.model";
import { WebSocketService } from "./web-socket.service";

@Injectable()
export class TeamService {
    constructor(
        @Inject(TeamModel) private model: MongooseModel<TeamModel>,
        @Inject(WebSocketService) private webSocketService: WebSocketService
    ) {

    }

    async save(obj: TeamModel) {
        const doc = new this.model(obj);
        let team = await doc.save();
        team = await team
            .populate("category")
            .populate("district")
            .execPopulate();
        this.webSocketService.broadcast("new-team", team);
        return team;
    }

    async getAll() {
        return await this.model
            .find()
            .sort('name')
            .populate("category")
            .populate("district")
            .exec();
    }

    async findById(id: string) {
        return await this.model
            .findById(id)
            .populate("category")
            .populate("district")
            .exec();
    }

    async deleteById(id: string) {
        const team = await this.model
            .deleteOne({ _id: id })
            .populate("category")
            .populate("district")
            .exec();
        this.webSocketService.broadcast("delete-team", team);
        return team;
    }
}
