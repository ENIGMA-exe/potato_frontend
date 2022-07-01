
import cookies from 'js-cookie';

var userAuthentication = {
    isLogin:false,
    isError:false,
    error:"",
    userData:{}
};

if(cookies.get("potato_auth") !== undefined){
    userAuthentication = {...userAuthentication,
    'isLogin':true,
    'userData':JSON.parse(cookies.get("potato_auth"))}
}


// Auththentication action consist of auth checking , login and sign-up methods

export function Authentication(state = userAuthentication , action){

    switch(action.type){
        case "UAUTH":
            if(cookies.get("potato_auth") !== undefined){
                return{
                    ...state,
                    'isLogin':true,
                    'userData':JSON.parse(cookies.get("potato_auth"))
                }
            }else{ return state}

        case "LOGIN":
            cookies.set("potato_auth",JSON.stringify(action.payload));

            return{
                ...state,
                'isLogin':true,
                'userData':action.payload
            }
        
        case "LOGOUT":
            cookies.remove("potato_auth");
            cookies.remove("potato_skip")

            return{
                ...state,
                'isLogin':false,
                'userData':{}
            }
        
        case "ERROR":
            return{
                ...state,
                'isError':true,
                'error':action.payload
            }


        default :return state;
    }

}
