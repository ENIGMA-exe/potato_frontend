var seriesFatchable = {
    horror:true,
    comedi:true,
    romantic:true
}

export const Series_dynamic_fatching = (state = seriesFatchable,action)=>{

    switch(action.type){
        case "SET_SERIES_FATCHABLE_FALSE":
            return{
                ...state,
                [state[action.payload]]:false
            }
        default:
            return state
    }
}