import ApiClient from "../../../lib/client.ts";


export class UserService {
    static async auth<T, >() {
            const response = await ApiClient.get<T>("/user/get")
            return response.data
    }
}