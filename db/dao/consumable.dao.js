import {BaseDao, DB_FILE_NAME} from "./base.dao.js";

class ConsumableDao extends BaseDao {
    static #callInit = super.initDatastoreWith(DB_FILE_NAME.consumable);
}

export {ConsumableDao}