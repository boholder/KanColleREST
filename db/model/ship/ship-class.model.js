import {NameModel} from "../name.model.js";
import {FieldEntityArray} from "../simplified-field-entity.model.js";
import {ShipTypeDao} from "../../dao/ship-type.dao.js";
import {ShipTypeModel} from "./ship-type.model.js";
import {ModelBuildError} from "../../../util/error.js";
import {logger} from "../../../config/winston-logger.js";

class ShipClassModel {
    constructor({id, name, ship_type_id, speed_rule} = {}) {
        this.id = id;
        this.name = new NameModel(name);
        this.type = ship_type_id || new FieldEntityArray();
        // Ship's speed,
        // which will affect fleet route on the map.
        // According to nedb file, it's value ranges
        // from low-1 (to low-4) to (high-1 to) high-4,
        // in which low-1 is lowest (Yamato class),
        // and high-1 is fastest
        // (Shimakaze(DD), Tashkent(DD), Tone(CA), Mogami(CA), Taihou(CV), Shoukaku(CV)... class)
        // (general Destroyer classes speeds are high-3).
        // -----------------------------
        // I'll add two additional field:
        //      speed_type: high or low,
        //      speed_rank: low-1~low-4: 1-4, high-4~high-1: 1~4
        this.speed_rule = speed_rule || '';
        this.speed_type = '';
        this.speed_rank = NaN;
        this.#setSpeedTypeAndSpeedRank(speed_rule);
    }

    #setSpeedTypeAndSpeedRank(speed_rule = {}) {
        if (this.speed_rule) {
            let regex = /([a-z]{3,4})-(\d)/
            let matchArray = speed_rule.match(regex);
            this.speed_type = matchArray[1];
            this.speed_rank = this.speed_type === "high" ? matchArray[2] : 5 - matchArray[2];
        }
    }

    static async build(shipClass = {}) {
        try {
            return await this.#buildModel(shipClass);
        } catch (e) {
            logger.warn(
                new ModelBuildError('ShipClassModel', e).toString()
            );
            return new ShipClassModel(shipClass);
        }
    }

    static async #buildModel(shipClass) {
        shipClass.ship_type_id = await ShipTypeDao.getIdNameBy(shipClass.ship_type_id);
        return new ShipTypeModel(shipClass);
    }
}

export {ShipClassModel}