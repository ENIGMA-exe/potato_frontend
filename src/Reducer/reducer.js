import { combineReducers } from "redux";

import { DBrecord } from "./DBrecord";
import { MV_Operation } from "./moviesFatching";
import { Series_dynamic_fatching } from "./seriesDFatching";
import { SD_Operation } from "./seriesFetching";
import {Authentication} from "./userAuth";
import { Movies_dynamic_fatching } from "./moviesDFatching";

const rootReducer = combineReducers({
    Authentication,
    DBrecord,
    SD_Operation,
    MV_Operation,
    Series_dynamic_fatching,
    Movies_dynamic_fatching,
})

export default rootReducer;