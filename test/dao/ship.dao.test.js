import {getShipBy, getShipIdNameBy} from "../../db/dao/ship.dao.js";

test('handle db query encounter error', () => {
    return getShipBy(-1).then(value => {
        expect(value).toBeTruthy();
    })
});

test('query db and print one instance', () => {
    return getShipBy(1).then(value => {
        console.log(value);
    });
});

test('query db and print one id-name instance', () => {
    return getShipIdNameBy(1).then(value => {
        console.log(value);
    });
});