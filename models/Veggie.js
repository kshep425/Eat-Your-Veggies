const orm = require("../config/orm");

class Veggie {
    constructor() {
        this.veg_id;

        // name of vegetable;
        this.veg_name;

        // veg_state true means it's been eaten or devoured, otherwise it's not eaten or devoured.
        this.veg_state = false;
    }

    add(veg_name = '', callback) {

        if (veg_name === '') {
            throw new Error("Error: Please include name of vegetable");
        }
        this.veg_name = veg_name;
        this.add_to_db(function (result) {
            callback(result)
        })
    }

    devour(callback) {
        this.veg_state = true;
        this.update_db_veg_state(function (result) {
            callback(result)
        })
    }

    get_veg_name() {
        return this.veg_name;
    }

    get_veg_state() {
        return this.veg_state;
    }

    get_veg() {
        const veg = {
            veg_id: this.veg_id,
            veg_name: this.veg_name,
            veg_state: this.veg_state
        };

        return veg;
    }

    set_veg_id(veg_id) {
        this.veg_id = veg_id;
    }

    add_to_db(callback) {
        const veg = this
        try {
            orm.add_veggie(this.veg_name, this.veg_state, function (result) {
                //console.log(result)
                veg.set_veg_id(result.insertId)
                callback(result);
            })
        } catch (err) {
            throw (err);
        }
    }

    update_db_veg_state(callback) {
        try {
            orm.update_veg_state(this.veg_id, this.veg_state, function (result) {
                // console.log(result)
                callback(result);
            })
        } catch (err) {
            throw (err);
        }

    }

    all(callback) {
        try {
            orm.get_veggies(function (result) {
                // console.log(result)
                callback(result);
            })
        } catch (err) {
            throw (err);
        }
    }

}

module.exports = Veggie