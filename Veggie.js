const orm = require("./config/orm");
const util = require("util")

const orm_add_veggie = util.promisify(orm.add_veggie)
const orm_devour_veggie = util.promisify(orm.devour_veggie)

class Veggie{
    constructor(){
        // name of vegetable;
        this.veg_id;
        this.veg_name;

        // veg_state true means it's been eaten or devoured, otherwise it's not eaten or devoured.
        this.veg_state = false;
    }

    add(veg_name ='', callback){

        if (veg_name === '') {
            throw new Error ("Error: Please include name of vegetable");
        }
        this.veg_name = veg_name;
        orm_add_veggie(veg_name)
            .then((result)=>{
                veg_id = result.insertId;
                callback(result);

            })
            .catch((err)=>{
                console.log("Caught an error: ", err)
                throw err
            });

    }

    devour(callback){
        this.veg_state = true;
        orm_devour_veggie(this.veg_name)
        .then((result)=>{
            callback(result);
        })
        .catch((err)=>{

            console.log("Caught an error: ", err)
            throw err;
        });
    }

    get_veg_name(){
        return this.veg_name;
    }

    get_veg_state(){
        return this.veg_state;
    }

    get_veg(){
        const veg = {
            veg_id: this.veg_id,
            veg_name: this.veg_name,
            veg_state: this.veg_state
        };

        return veg;
    }

}

module.exports = Veggie