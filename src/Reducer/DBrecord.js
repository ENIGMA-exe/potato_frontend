require('dotenv').config();

var Record = {}

export function DBrecord(state = Record,action){
    switch(action.type){
        case "FILL_DBRECORD":
            return action.payload
        default:
            return state
    }
}