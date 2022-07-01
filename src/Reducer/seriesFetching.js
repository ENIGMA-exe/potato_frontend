
var seriesData = {}

//SD_Operation action consist of....

export const SD_Operation = (state = seriesData, action) => {
    
    switch (action.type) {
        
        case "FILL_SDATA":
            return action.payload;

        case "GET_MORE_DATA":
            return {
                ...state,
                [action.payload.genTyp]: [...state[action.payload.genTyp], ...action.payload.data]
            }

        default:
            return state;
    }
}

