import React,{useEffect,useState}from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UlogOut } from '../../Action/action';

import NavBar from '../../Components/NavBar/NavBar';
import './PRF.css';
import bannerLogo from './Pokemon-go-banner-2.png'
import Footer from '../../Components/Footer/Footer';


var Profile = () => {

    const [edBlockCss, setEdBlockCss] = useState({display:"none"})

    var changeCSS = ()=>{
        if(edBlockCss.display === "none"){
            setEdBlockCss({display:"flex"})
        }else{setEdBlockCss({display:"none"})}
    }

    
    var userState = useSelector(state => state.Authentication);
    var dispatch = useDispatch();
    var history = useHistory();
    
    useEffect(()=>{
        document.title = "profile"

        if(!userState.isLogin){
            history.push('/')
        }
    },[userState,history])

    return (
        <>  
            <NavBar/>

            <div className="prof_main">
                <div className="profile_markup">
                    <div className="prof_banner">
                        <img src={bannerLogo} alt=""/>
                    </div>
                    <div className="prof_logo">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="user_name">
                        {`${userState.userData.fname} ${userState.userData.lname}`}
                    </div>

                    <i className="far fa-edit" onClick={changeCSS}></i>

                    <div className="edit-block" style={edBlockCss}>
                        <div className="inner-eb">Edit Profile</div>
                        <div className="inner-eb" onClick={()=>{dispatch(UlogOut())}}>Logout</div>
                    </div>
                </div>

                <div className="info_body">
                    <div className="card-heading">
                        Favourite &nbsp;
                        <span>Movies</span>&nbsp; N &nbsp;
                        <span>Series</span>
                    </div>
                    <div className="card_sc">

                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1LfhaUOesZyqWPNItBUZNyNijHRmCdPVr' alt="no img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1msjBN6ndkl_v6lK97h9_yJgh5t0YETDW' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1woWSz6ikjhgCCQ9A4oDWA1B8O3-50eXT' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1k6xjJJNMH7DAr22Cx8q6maH2_qszB67C' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1Sgb6uJoJFCe54NRPLmnVNielu5G7R3LK' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1Aocf4FQLefR1rSC-C7N3p33ZbKLqLeQW' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1LfhaUOesZyqWPNItBUZNyNijHRmCdPVr' alt="no img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1msjBN6ndkl_v6lK97h9_yJgh5t0YETDW' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1woWSz6ikjhgCCQ9A4oDWA1B8O3-50eXT' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1k6xjJJNMH7DAr22Cx8q6maH2_qszB67C' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1Sgb6uJoJFCe54NRPLmnVNielu5G7R3LK' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1Aocf4FQLefR1rSC-C7N3p33ZbKLqLeQW' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1LfhaUOesZyqWPNItBUZNyNijHRmCdPVr' alt="no img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1msjBN6ndkl_v6lK97h9_yJgh5t0YETDW' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1woWSz6ikjhgCCQ9A4oDWA1B8O3-50eXT' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1k6xjJJNMH7DAr22Cx8q6maH2_qszB67C' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1Sgb6uJoJFCe54NRPLmnVNielu5G7R3LK' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1Aocf4FQLefR1rSC-C7N3p33ZbKLqLeQW' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1LfhaUOesZyqWPNItBUZNyNijHRmCdPVr' alt="no img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1msjBN6ndkl_v6lK97h9_yJgh5t0YETDW' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1woWSz6ikjhgCCQ9A4oDWA1B8O3-50eXT' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1k6xjJJNMH7DAr22Cx8q6maH2_qszB67C' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1Sgb6uJoJFCe54NRPLmnVNielu5G7R3LK' alt="no img"
                                className="card_img" />
                        </div>
                        <div className="g_card">
                            <img src='https://drive.google.com/uc?id=1Aocf4FQLefR1rSC-C7N3p33ZbKLqLeQW' alt="no img"
                                className="card_img" />
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Profile;
