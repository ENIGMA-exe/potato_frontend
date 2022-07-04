import React, { useEffect, useState, memo } from 'react';
import $ from 'jquery';
 
import swal from 'sweetalert';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import { useDispatch,useSelector } from 'react-redux';
import { ULError, ULogin } from '../../Action/action';

import './LF.css';
import LoginLogo from './demo.png';

require('dotenv').config();

var LoginForm = (props) => {

    var dispatch = useDispatch();
    var loginState = useSelector((state)=>state.Authentication);

    let history = useHistory();
    var [inputType,setInputType] = useState("password")
    var handleInputType = ()=>{
        if(inputType === 'password'){
            setInputType("text")
        }else{
            setInputType("password")
        }
    }
    
    useEffect(()=>{
        if(loginState.isError){
            //console.log("from loginform line 22:-",loginState.error)
            swal({
                title: "Login Error",
                icon: "error",
            });
        }
        if(loginState.Login){
            history.push('/home')
        }

        //console.log("login form component")
        
    },[loginState,history])

    //.............states.............................

    
    
    //console.log("lform "+myState)

    var [SignUpData, setSignUpData] = useState({
        fname:'',
        lname:"",
        email:'',
        pwd:''
    })

    var [pass_2,setPass_2] = useState({pwd2:''})

    var [LoginData, setLoginData] = useState({
        email:'',
        pwd:''
    });

    //..............functions for sliding window.........................

    var RightSlider = ()=>{
        $(".slider").animate({right:'0',left:'50%'},'slow');
    }

    var LeftSlider = ()=>{
        $(".slider").animate({left:'0',right:'50%'},'slow');
    }

    //..............functions for filling data.........................
    var signupFillup = (e)=>{
        if(e.target.name === 'user_fname'){setSignUpData({...SignUpData,'fname':e.target.value})}
        if(e.target.name === 'user_lname'){setSignUpData({...SignUpData,'lname':e.target.value})}
        if(e.target.name === 'user_em'){setSignUpData({...SignUpData,'email':e.target.value})}
        if(e.target.name === 'user_pass'){setSignUpData({...SignUpData,'pwd':e.target.value})}

        //if(e.target.name === 'user_pass_2'){setSignUpData({...SignUpData,'pwd2':e.target.value})}
        if(e.target.name === 'user_pass_2'){setPass_2({pwd2:e.target.value})}
    }

    var LoginFillup = (e)=>{
        if(e.target.name === 'userid'){setLoginData({...LoginData,'email':e.target.value})}
        if(e.target.name === 'pass'){setLoginData({...LoginData,'pwd':e.target.value})}
    }

    //..............functions for signup and login.........................
    var Signup = async ()=>{

        if(SignUpData.name !== "" & SignUpData.email !== "" & SignUpData.pwd !== ""){
            if(SignUpData.pwd === pass_2.pwd2){
                if(SignUpData.pwd.length > 5){
                    try {
                        var response = await axios.post('http://localhost:3135/user_details',SignUpData);
                        if(response.data === "EAE"){
                            swal({
                            title: 'Email Already Exist!',
                            icon: "error"
                        })}else{
                            swal({
                                title: response.data,
                                icon: "success"
                            })
                            RightSlider();
                            
                            document.querySelectorAll('.signup_input').forEach(elm=> {
                                elm.value = ""
                            })
                            
                        }
                        
                    } catch (e) {
                        
                        swal({
                            title:"Error in SignUp",
                            icon:"error"
                        })
                    }

                    console.log(SignUpData);
                    
                    
                }else{swal({title: "password length is too short!",icon: "warning"});}
            }else{swal({title: "passwords are not matching",icon: "warning"});}
        }else{swal({title: "Incomplite fillup",icon: "warning"});}
    }

    var Login = async ()=>{
        if(LoginData.email !== '' & LoginData.pass!== ''){

            axios.post(process.env.REACT_APP_UL_API,LoginData)
            .then(res=>{
                if(res.data === "UNF"){
                    swal({
                        title: "User not Found",
                        icon: "error"
                    });
                }else{
                    dispatch(ULogin(res.data));
                    history.push("/home")
                }

                
                
            })
            .catch((e)=>{
                dispatch(ULError(e));
                swal({
                    title: "some errror in login",
                    icon: "error"
                });
            })
        }else{
            swal({
                title: "Incomplite fillup",
                icon: "warning"
            });
        }

        //console.log(LoginData);
    }

    
    return (
        <>
            <div className="l_main">

                <div className="login">
                    <p>heloo Pokies!</p>

                    <div className="fillup">
                        <i className="far fa-envelope"></i>
                        <input onChange={LoginFillup} value={LoginData.email} id="userid" name="userid" autoComplete="off" type="text" placeholder="Email" />
                    </div>

                    <div className="fillup">
                        <i className="fas fa-lock"></i>
                        <input onChange={LoginFillup} value={LoginData.pass} id="pass" name="pass" autoComplete="off" type={inputType} placeholder="password" />
                        <i className="fas fa-eye" id="eye" onClick={handleInputType}></i>
                    </div>

                    <button onClick={Login}>Login</button>
                    <p id="signup">don't have an account?<span id="click_1" onClick={LeftSlider}>create</span> </p>
                    <p id="fo_p">Forget password</p>
                </div>
                {/* <!-- .................................................................................................. --> */}
                <div className="signup">
                    <p>Lets Join Pokies!</p>

                    <div className="fillup">
                        <i className="fas fa-users"></i>
                        <input className='signup_input' onChange={signupFillup} value={SignUpData.userFName} id="user_fname" name="user_fname" autoComplete="off" type="text" placeholder="first name" />
                    </div>

                    <div className="fillup">
                        <i className="fas fa-users"></i>
                        <input className='signup_input' onChange={signupFillup} value={SignUpData.userLName} id="user_lname" name="user_lname" autoComplete="off" type="text" placeholder="last name" />
                    </div>

                    <div className="fillup">
                        <i className="far fa-envelope"></i>
                        <input className='signup_input' onChange={signupFillup} value={SignUpData.email} id="user_em" name="user_em" autoComplete="off" type="text" placeholder="email" />
                    </div>

                    <div className="fillup">
                        <i className="fas fa-lock"></i>
                        <input className='signup_input' onChange={signupFillup} value={SignUpData.pass} id="user_pass" name="user_pass" autoComplete="off" type="password" placeholder="password" />
                    </div>

                    <div className="fillup">
                        <i className="fas fa-lock"></i>
                        <input className='signup_input' onChange={signupFillup} value={SignUpData.pass2} id="user_pass_2" name="user_pass_2" autoComplete="off" type="password" placeholder="password(re type)" />
                    </div>

                    <button onClick={Signup}>Register</button>
                    <p id="login">Already have an account.<span id="click_2" onClick={RightSlider}>login</span> </p>
                </div>
                {/* <!-- ................................................................................................--> */}
                <div className="slider">
                    <div className="img_area">
                        <div className="close_tab" onClick={props.closefunction}>
                            close
                        </div>
                        <div className="img_sec">
                            <img src={LoginLogo} alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};

export default memo(LoginForm);

