import UrlAPIControllers from "../config/urlServiceConfig.js";
import HttpServiceConfig from "../config/httpServiceConfig.js";

export class usersAPIControllers {


    findAll() {
        const FETCH_URL = new UrlAPIControllers().getUsersUrl();
        return new HttpServiceConfig().get(FETCH_URL);
    }


    create(body) {
        console.log(body);
        const FETCH_URL = new UrlAPIControllers().getUsersUrl();
        return new HttpServiceConfig().post(FETCH_URL, body);
    }

    login(body) {
        console.log(body);
        const FETCH_URL = new UrlAPIControllers().getUsersUrl()+'login';
        console.log(FETCH_URL);
        return new HttpServiceConfig().post(FETCH_URL, body);
    }

    update(body) {
        const FETCH_URL = new UrlAPIControllers().getUsersUrl();
        return new HttpServiceConfig().put(FETCH_URL, body);
    }

    delete(id) {
        const FETCH_URL = new UrlAPIControllers().getUsersUrl() + id;
        return new HttpServiceConfig().delete(FETCH_URL);
    }

    findById(id) {
        const FETCH_URL = new UrlAPIControllers().getUsersUrl() + id;
        return new HttpServiceConfig().get(FETCH_URL);
    }
}

export default usersAPIControllers;
