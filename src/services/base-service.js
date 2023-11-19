import axiosClient from "../axiosClient";

export default class BaseService {
    constructor(path) {
        this.path = path;
        this.axiosClient = axiosClient;
    }
}