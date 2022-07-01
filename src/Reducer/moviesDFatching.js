var moviesFatchable = {
    horror:true,
    comedi:true,
    romantic:true
}

export const Movies_dynamic_fatching = (state = moviesFatchable,action)=>{

    switch(action.type){
        case "SET_MOVIE_FATCHABLE_FALSE":
            return{
                ...state,
                [state[action.payload]]:false
            }
        default:
            return state
    }
}