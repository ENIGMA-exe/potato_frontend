import axios from "axios";
import jsCookie from "js-cookie";

require("dotenv").config()



//USER AUTHENTICATION ACTIONS..............

export const Uauth = () => {
    return { type: 'UAUTH' }
}
export const ULogin = (data) => {
    return {
        type: 'LOGIN',
        payload: data,
    }
}
export const ULError = (error) => {
    return {
        type: 'ERROR',
        payload: error
    }
}

export const UlogOut = () => {
    return { type: 'LOGOUT' }
}

//DB RECORD 
export const getDBRecord = () => {
    return (dispatch , getstate) =>{
        axios.get(process.env.REACT_APP_DBR_API)
            .then((res) => {
                var Record = { totalSeries: 0, totalMovies: 0, }

                Record.totalSeries = res.data.total_series
                Record.totalMovies = res.data.total_movies
                dispatch(Fill_DBRecord(Record))
            })
            .catch((err) => {
                console.log("@DBrecord", err)
            })
    }
}

export const Fill_DBRecord = (data) =>{
    return {
        type:"FILL_DBRECORD",
        payload:data
    }
}

//SERIES DATA FATCHING ACTIONS.......

export const Sdata_Fetch = (limit) => {

    return async (dispatch, getstate) => {
        var gen_typ = ['horror', 'comedi', 'romantic'];
        var seriesData = { horror: [], comedi: [], romantic: [] }

        // manual api fetch based on genres
        // this need to be optimise

        if(limit === undefined){
            try {
                const horrorData = await axios.get(`${process.env.REACT_APP_SD_API}${gen_typ[0]}?limit=12&skip=0`)
                const comediData = await axios.get(`${process.env.REACT_APP_SD_API}${gen_typ[1]}?limit=12&skip=0`)
                const romanticData = await axios.get(`${process.env.REACT_APP_SD_API}${gen_typ[2]}?limit=12&skip=0`)

                seriesData[gen_typ[0]] = horrorData.data
                seriesData[gen_typ[1]] = comediData.data
                seriesData[gen_typ[2]] = romanticData.data

                dispatch(Fill_sdata(seriesData))
                
            } catch (e) {
                console.log("@sd_op func", e);
            }
        }else{
            console.log("action else part,sdata_fetch, limit ",limit)
            try {
                const horrorData = await axios.get(`${process.env.REACT_APP_SD_API}${gen_typ[0]}?limit=${limit}&skip=0`)
                const comediData = await axios.get(`${process.env.REACT_APP_SD_API}${gen_typ[1]}?limit=${limit}&skip=0`)
                const romanticData = await axios.get(`${process.env.REACT_APP_SD_API}${gen_typ[2]}?limit=${limit}&skip=0`)

                seriesData[gen_typ[0]] = horrorData.data
                seriesData[gen_typ[1]] = comediData.data
                seriesData[gen_typ[2]] = romanticData.data

                console.log(seriesData)
                dispatch(Fill_sdata(seriesData))
                
            } catch (e) {
                console.log("@sd_op func", e);
            }
        }
        
        // return "temp"

        // loop method , api data fetching
        // this need to remove and instead of loop api fetch, use single api endpoint that will do all this task
        // need to define this endpoint in backend

        // gen_typ.forEach(async (elm, index) => {
        //     try {
        //         var result = await axios.get(`${process.env.REACT_APP_SD_API}${elm}?limit=12&skip=0`)
        //         seriesData = { ...seriesData, [elm]: result.data }

        //         dispatch(Fill_sdata(seriesData))
        //     } catch (e) {
        //         console.log("@sd_op func", e);
        //     }
        // })
    }

}


export const Fill_sdata = (data) => {
    return {
        type: "FILL_SDATA",
        payload: data
    }
}

// DYNAMIC SERIES DATA FETCHING USING SKIP METHOD....

export const dynamic_data_fetch = (data) => {
    //console.log("dynamic data fetch is calling",data)
    return async (dispatch,getstate) => {
        try{
            var result = await axios.get(`${process.env.REACT_APP_SD_API}${data.genres}?limit=12&skip=${data.skip}`)
            if(result.data.length === 0){
                dispatch(set_series_fatchable_false(data.genres))
            }else{
                console.log(result.data)
                jsCookie.set("potato_series_skip",Number(jsCookie.get("potato_skip"))+12)
            }
        }catch(e){
            console.log('error in dynamic data fetching',e)
        }
        
    }
}

export const set_series_fatchable_false = (genres)=>{
    return{
        type:"SET_SERIES_FATCHABLE_FALSE",
        payload:genres
    }
}

export const append_sdata = (data)=>{
    return{
        type:"GET_MORE_DATA",
        payload:data
    }
}

// MOVIES DATA FETCHING ACTION............

export const Mdata_Fetch = () =>{

    return async (dispatch , getState) =>{
        var gen_typ = ['horror', 'comedi', 'romantic'];
        var moviesData = { horror: [], comedi: [], romantic: [] }

        const horrorData = await axios.get(`${process.env.REACT_APP_MD_API}${gen_typ[0]}?limit=12&skip=0`)
        const comediData = await axios.get(`${process.env.REACT_APP_MD_API}${gen_typ[1]}?limit=12&skip=0`)
        const romanticData = await axios.get(`${process.env.REACT_APP_MD_API}${gen_typ[2]}?limit=12&skip=0`)

        moviesData[gen_typ[0]] = horrorData.data
        moviesData[gen_typ[1]] = comediData.data
        moviesData[gen_typ[2]] = romanticData.data

        dispatch(Fill_mdata(moviesData))

        // gen_typ.forEach(async (elm, index) => {
        //     try {
        //         var result = await axios.get(`${process.env.REACT_APP_MD_API}${elm}?limit=12&skip=0`)
        //         moviesData = { ...moviesData, [elm]: result.data }

        //         dispatch(Fill_mdata(moviesData))
        //     } catch (e) {
        //         console.log("@sd_op func", e);
        //     }
        // })
    }
}

export const Fill_mdata = (data)=>{
    return {
        type:'FILL_MDATA',
        payload:data
    }
}

export const append_mdata = (data)=>{
    return{
        type:"GET_MORE_MOVIES",
        payload:data
    }
}

export const set_movies_fatchable_false = (genres)=>{
    //console.log("set_fatchabl is call")
    return{
        type:"SET_MOVIE_FATCHABLE_FALSE",
        payload:genres
    }
}

//DYNAMIC MOVIE DATA FETCHING....
//  (yet to add)
