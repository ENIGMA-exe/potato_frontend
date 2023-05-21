import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';
import './AB.css';
import pLogo from './img_potato.png'



const AboutUs = () => {

    var userState = useSelector(state => state.Authentication)
    //var series_data = useSelector(state => state.SD_Operation);

    var history = useHistory()
    //var dispatch = useDispatch()

    useEffect(()=>{
        document.title = "home"
        if(!userState.isLogin){
            history.push('/')
        }

        //console.log("ab page",series_data)
        //console.log("about us page");
    },[userState,history])

    return (
        <>
            <NavBar/>

            {/* <div className="abhead">
                <p>About us</p>
            </div> */}

            <div className="abmain_1">
                <div className="para_1">
                    <p className="heading">
                        The CineScope family and its product.
                    </p>
                    <p className="paragraph">
                    At the heart of CineScope is a deep appreciation for the artistry 
                    and storytelling that Anime brings. The platform showcases a wide 
                    range of genres, from action-packed shonen adventures to heartwarming 
                    slice-of-life tales, ensuring there is something for everyone. 
                    Whether you're a long-time Anime aficionado or a newcomer looking 
                    to explore this vibrant world, CineScope has you covered.
                    </p>
                    <button>Something</button>
                </div>
                <div className="logo_sec">
                    <div className="logo">
                        <img src={pLogo} alt=""/>
                    </div>
                </div>
            </div>

            <div className="abmain_2">
                <div className="in_heading">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus.</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum possimus placeat numquam.</p>
                </div>
                <div className="in_card_sec">
                    <div className="card">
                        <div className="ca_logo"><i className="fas fa-home"></i></div>
                        <div className="ca_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Esse maiores voluptatibus, voluptates voluptas tenetur eveniet.
                            Ad aliquam officia voluptatem quam modi explicabo voluptate quos
                            provident omnis aliquid doloremque, aspernatur dicta.
                        </div>
                    </div>
                    <div className="card">
                        <div className="ca_logo"><i className="fas fa-cloud"></i></div>
                        <div className="ca_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Esse maiores voluptatibus, voluptates voluptas tenetur eveniet.
                            Ad aliquam officia voluptatem quam modi explicabo voluptate quos
                            provident omnis aliquid doloremque, aspernatur dicta.
                        </div>
                    </div>
                    <div className="card">
                        <div className="ca_logo"><i className="fas fa-network-wired"></i></div>
                        <div className="ca_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Esse maiores voluptatibus, voluptates voluptas tenetur eveniet.
                            Ad aliquam officia voluptatem quam modi explicabo voluptate quos
                            provident omnis aliquid doloremque, aspernatur dicta.
                        </div>
                    </div>
                    <div className="card">
                        <div className="ca_logo"><i className="fas fa-shield-alt"></i></div>
                        <div className="ca_para">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Esse maiores voluptatibus, voluptates voluptas tenetur eveniet.
                            Ad aliquam officia voluptatem quam modi explicabo voluptate quos
                            provident omnis aliquid doloremque, aspernatur dicta.
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default AboutUs;