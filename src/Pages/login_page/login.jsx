import React,{useState,useEffect} from 'react';
import Cookies from 'js-cookie';

import LoginForm from '../../Components/LoginForm/LoginForm';
import './login.css';
import logo from './pokiball.png';
import { useHistory } from 'react-router-dom';


var Login = () => {

    var history = useHistory()
    useEffect(() => {
        if(Cookies.get('userID') === undefined || Cookies.get('userID') === ''){
            history.push("/");
            document.title = 'welcome page'
        }else{history.push('/home')}
    },[])

    const [PopDisplay, setPopDisplay] = useState({display:'none'});

    var DisplayPopup = ()=>{
        setPopDisplay({display:'flex'});
    }

    var ClosePopup = ()=>{
        setPopDisplay({display:'none'});
    }


    return (
        <>  
        
            <div className='popup' style={PopDisplay}>
                <LoginForm closefunction={ClosePopup}/>
            </div>

            <div className="LoginHeader">
                <div className="header_content">
                    <div className="header-title">Watch Out! New <br/> <span>Poki-Poki.</span></div>
                    <div className="header-para">
                        <p>
                            <b>POKI-POKI</b> is the fastest and safest way to buy, sell, store and accept cryptocurrencies.
                            No more having to wait or fall prey to fraudulent buyers or sellers.
                        </p>
                    </div>

                    <div className="bt-area">
                        <button onClick={DisplayPopup}>Log In / Sign Up</button>
                    </div>
                </div>
                <img className="header-img" id="front-img" src={logo} alt="" />
            </div>
        </>
    )
}

export default Login;