import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { ResultModel } from "src/models/result.model";
import { WebSocketService } from "./web-socket.service";

@Injectable()
export class ResultService {
    constructor(
        @Inject(ResultModel) private model: MongooseModel<ResultModel>,
        @Inject(WebSocketService) private webSocketService: WebSocketService
    ) {

    }

    async save(obj: ResultModel) {
        const doc = new this.model(obj);
        let result = await doc.save();
        result = await result
            .populate("team")
            .populate("race")
            .execPopulate();
        this.webSocketService.broadcast("new-result", result);
        return result;
    }

    async getAll() {
        return await this.model
            .find()
            .populate("team")
            .populate("race")
            .exec();
    }

    async findById(id: string) {
        return await this.model
            .findById(id)
            .populate("team")
            .populate("race")
            .exec();
    }

    async patchYouTubeLink(id: string, link: string) {
        let result = await this.model
            .findByIdAndUpdate(id, { media: { youtube: link } })
            .populate("team")
            .populate("race")
            .exec();
        this.webSocketService.broadcast("update-result", result);
        return result;
    }

    async deleteById(id: string) {
        const result = await this.model
            .findOneAndDelete({ _id: id })
            .populate("team")
            .populate("race")
            .exec();
        this.webSocketService.broadcast("delete-result", result);
        return result;
    }
}
