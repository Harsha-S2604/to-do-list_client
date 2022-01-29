import axios from "axios";

export default class Api {

    constructor() {
        this.client = null
        this.api_url = process.env.REACT_APP_API_DEV_ENDPOINT
    }

    init = () => {
        let headers = {
            Accept: "application/json"
        }

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        })

        return this.client
    }

    addNewUser = (data) => {
        return this.init().post("user/add", data)
    }

    getTasks = (data, limit, offset) => {
        let url = "task/tasks/"+data["userId"]+"?limit="+limit+"&offset="+offset
        return this.init().get(url, data)
    }

    addNewTask = (data) => {
        return this.init().post("task/add", data)
    }

}