import { ApiService } from "./ApiService";

export default class FileApiService extends ApiService {
    constructor(token: string) {
        super("file");

        this.api = this.api.extend({
            headers: {
                Authorization: token
            }
        });
    }
}
