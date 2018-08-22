const LOCAL_URL = 'localhost';
const PORT = "3010";
const LocalHost = "http://localhost:3010/";
const api = "api/";
const ONLINE_URL = "";
const RealAPI = ONLINE_URL + ":" + PORT + "/";
const FakeAPI = LocalHost;

export class urlServiceConfig {

    getUsersUrl() {
        return FakeAPI  + "users/";
    }

    getTodoUrl() {
        return FakeAPI  + "todo/";
    }
}
export default urlServiceConfig;
