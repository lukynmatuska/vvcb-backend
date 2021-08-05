import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { DistrictModel } from "src/models/district.model";
import { WebSocketService } from "./web-socket.service";

@Injectable()
export class DistrictService {
    constructor(
        @Inject(DistrictModel) private model: MongooseModel<DistrictModel>,
        @Inject(WebSocketService) private webSocketService: WebSocketService
    ) {

    }

    async save(obj: DistrictModel) {
        const doc = new this.model(obj);
        await doc.save();
        this.webSocketService.broadcast("new-district", doc);
        return doc;
    }

    async getAll() {
        return await this.model.find();
    }

    async findById(id: string) {
        return await this.model.findById(id);
    }

    async deleteById(id: string) {
        const district = await this.model.findOneAndDelete({ _id: id });
        this.webSocketService.broadcast("delete-district", district);
        return district;
    }
}
