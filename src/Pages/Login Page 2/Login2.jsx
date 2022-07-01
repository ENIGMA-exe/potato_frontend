import React, { useState, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../../Components/LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import './HP2.css'
import { getDBRecord, Mdata_Fetch, Sdata_Fetch, Uauth } from '../../Action/action';

require('dotenv').config()


const Login = () => {

    var loginState = useSelector(state => state.Authentication);
    var DB_record = useSelector(state => state.DBrecord);
    var series_data = useSelector(state => state.SD_Operation);
    var movies_data = useSelector(state => state.MV_Operation);

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
            <div className='lpopup' style={PopDisplay}>
                <LoginForm closefunction={ClosePopup} />
            </div>

            <div className='homeheader'>

                <div className="Leftsection">
                    <h1>Welcome To Our Potato Family</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Id quas voluptates quos voluptatem odit facilis, recusandae
                        rem totam fuga placeat aspernatur dolor quibusdam eaque quae
                        magni hic excepturi ab laborum!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                        odit fugit distinctio. Aliquid quo, hic magnam nemo eos suscipit ex
                        sunt amet possimus, error aliquam ducimus nam cupiditate ullam temporibus.
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perferendis, pariatur ut repudiandae atque tempora, eos consequuntur
                        soluta minima facilis incidunt dolor nobis sed quis amet quibusdam consectetur,
                        harum labore similique.
                    </div>
                    <button>view More ....</button>
                </div>
            </div>

            <div className="ban_1" id="type_2">
                <div className="upper_layer"></div>
                <div className="para_layer">
                    <div className="para">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perferendis, pariatur ut repudiandae atque tempora, eos consequuntur
                        soluta minima facilis incidunt dolor nobis sed quis amet quibusdam consectetur,
                        harum labore similique.
                    </div>
                    <button>view More ....</button>
                </div>
            </div>
        </>
    )
}

export default memo(Login);