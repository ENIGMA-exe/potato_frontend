import React, { useState, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../Components/LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import './LandingPage.css'
import { getDBRecord, Mdata_Fetch, Sdata_Fetch, Uauth } from '../../Action/action';
import Loader from '../../Components/Loader/Loader'

require('dotenv').config()


const Login = () => {

    var loginState = useSelector(state => state.Authentication);
    var DB_record = useSelector(state => state.DBrecord);
    var series_data = useSelector(state => state.SD_Operation);
    var movies_data = useSelector(state => state.MV_Operation);

    const [loader,setLoader] = useState(true)

    var dispatch = useDispatch();
    var History = useHistory()

    useEffect(() => {
        document.title = "Potato- login";

        //FETCHING DB RECORD
        if(Object.keys(DB_record).length === 0 || DB_record === {}){
            dispatch(getDBRecord());
        }
        

        //FETCHING SESRIES DATA
        if(Object.keys(series_data).length === 0 || series_data === {}){
            dispatch(Sdata_Fetch());
        }

        //FETCHING MOVIES DATA
        if(Object.keys(movies_data).length === 0 || movies_data === {}){
            dispatch(Mdata_Fetch())
        }

        if(loader){
            setTimeout(() => {
                setLoader(false)
            }, 2000);
        }
        

        //CHEKING USER AUTH
        dispatch(Uauth());
        if (loginState.isLogin) { History.push('/home') }


    },)


    const [PopDisplay, setPopDisplay] = useState({ display: 'none' });

    var DisplayPopup = () => {
        setPopDisplay({ display: 'flex' });
    }

    var ClosePopup = () => {
        setPopDisplay({ display: 'none' });
    }

    return (
        <>  
            {(loader)?<Loader/>:null}
            <div className='lpopup' style={PopDisplay}>
                <LoginForm closefunction={ClosePopup} />
            </div>

            <div className='homeheader'>

                <div className="Leftsection">
                    <h1>Welcome To  CineScope</h1>
                    <p>
                    One of the standout features of CineScope is its user-friendly interface, 
                    designed with the utmost convenience in mind. The platform's sleek and 
                    intuitive layout allows users to effortlessly browse and discover new titles. 
                    With advanced search options, personalized recommendations, 
                    and curated playlists, CineScope makes it easy to find the perfect 
                    Anime to suit your mood and interests.
                    </p>
                    <div className="inpsec">
                        <button id='btn' onClick={DisplayPopup}>sign up/ login</button>
                        {/* <button>Login</button> */}
                    </div>
                </div>

                <div className="RightSection">
                </div>

            </div>

            <div className="ban_1" id="type_1">
                <div className="upper_layer"></div>
                <div className="para_layer">
                    <div className="para">
                    CineScope is a cutting-edge OTT platform dedicated to delivering 
                    the best Anime content to fans around the globe. With its vast library 
                    of captivating and diverse animated series and movies, CineScope 
                    offers a one-stop destination for all Anime enthusiasts.
                    </div>
                    <button>view More ....</button>
                </div>
            </div>

            <div className="ban_1" id="type_2">
                <div className="upper_layer"></div>
                <div className="para_layer">
                    <div className="para">
                        CineScope is the ultimate destination for Anime lovers, 
                        offering a vast selection of captivating content, user-friendly 
                        interface, multilingual support, and an interactive community. 
                        With CineScope, fans can embark on an unforgettable journey 
                        through the captivating world of Anime, immersing themselves in its 
                        rich storytelling, breathtaking animation, and vibrant characters.
                    </div>
                    <button>view More ....</button>
                </div>
            </div>
        </>
    )
}

export default memo(Login);