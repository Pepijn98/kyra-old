import { ApiService, ErrorResponse, NewTokenResponse } from "./ApiService";

export default class UserApiService extends ApiService {
    token: string;

    constructor(token: string) {
        super("user");

        this.token = token;
        this.api = this.api.extend({
            hooks: {
                beforeRequest: [
                    (options) => {
                        options.headers.set("Authorization", this.token);
                    }
                ]
            }
        });
    }

    async resetToken(id: string): Promise<NewTokenResponse | ErrorResponse> {
        try {
            const resp = await this.api.get(`${id}/reset-token`).json<NewTokenResponse>();
            this.token = resp.data.token;
            return resp;
        } catch (error) {
            return await this.handleError(error);
        }
    }
}
