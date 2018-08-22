import UrlAPIControllers from "../config/urlServiceConfig.js";
import HttpServiceConfig from "../config/httpServiceConfig.js";

export class todoAPIControllers {


    findAll() {
        const FETCH_URL = new UrlAPIControllers().getTodoUrl();
        return new HttpServiceConfig().get(FETCH_URL);
    }
    findAllByUserId(id) {
        const FETCH_URL = new UrlAPIControllers().getTodoUrl()+"userId/"+id;
        return new HttpServiceConfig().get(FETCH_URL);
    }

    create(body) {
        console.log(body);
        const FETCH_URL = new UrlAPIControllers().getTodoUrl();
        return new HttpServiceConfig().post(FETCH_URL, body);
    }
    update(body) {
        const FETCH_URL = new UrlAPIControllers().getTodoUrl();
        return new HttpServiceConfig().put(FETCH_URL, body);
    }
    updatecComplete(body) {
        const FETCH_URL = new UrlAPIControllers().getTodoUrl()+"complete";
        return new HttpServiceConfig().put(FETCH_URL, body);
    }

    

    delete(id) {
        const FETCH_URL = new UrlAPIControllers().getTodoUrl() + id;
        return new HttpServiceConfig().delete(FETCH_URL);
    }

    findById(id) {
        const FETCH_URL = new UrlAPIControllers().getTodoUrl() + id;
        return new HttpServiceConfig().get(FETCH_URL);
    }

}

export default todoAPIControllers;
