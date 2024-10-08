import { ROUTE_API } from "../common";
import BaseAPI from "./BaseApi";

class TaskAPi extends BaseAPI {}

export default new TaskAPi(ROUTE_API.TASK);
