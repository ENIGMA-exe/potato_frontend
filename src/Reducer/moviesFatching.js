
var moviesData = {}

export const MV_Operation = (state = moviesData, action) =>{

    switch(action.type){

        case "FILL_MDATA":
            return action.payload;
        case "GET_MORE_MOVIES":
            return{
                ...state,
                [action.payload.genTyp]: [...state[action.payload.genTyp], action.payload.data]
            }
        default:
            return state
    }
}