import React from 'react'
import './BH.css';
import { Link } from 'react-router-dom';

import bannerimg1 from './banner1.png'
import bannerimg2 from './banner2.png'
import bannerimg3 from './banner3.png'
import bannerimg4 from './banner4.png'
import bannerimg5 from './banner5.png'

const data = [
    {
        name:"Sankarea: Undying Love",
        img:bannerimg1,
        link:'/media?base_url=1EL_HFE1VU84WQLRIwaiWj4nipwfyJJgm&type=series&id=series_1&genres=horror&ep=1'
    },
    {
        name:"School Days",
        img:bannerimg2,
        link:"/media?base_url=1EL_HFE1VU84WQLRIwaiWj4nipwfyJJgm&type=series&id=series_2&genres=horror&ep=1"
    },
    {
        name:"Vampire Knight",
        img:bannerimg3,
        link:'/media?base_url=1EL_HFE1VU84WQLRIwaiWj4nipwfyJJgm&type=series&id=series_3&genres=horror&ep=1'
    },
    {
        name:"Kemonozume",
        img:bannerimg4,
        link:'/media?base_url=1EL_HFE1VU84WQLRIwaiWj4nipwfyJJgm&type=series&id=series_4&genres=horror&ep=1'
    },
    {
        name:"Elfen Lied",
        img:bannerimg5,
        link:'/media?base_url=1EL_HFE1VU84WQLRIwaiWj4nipwfyJJgm&type=series&id=series_5&genres=horror&ep=1'
    }
]
var Banner = () => {
    
    return (
        <>  
            <div className='banner_slider'>
                {
                    data.map((item,index)=>{
                        return(
                            <div className="main_is" style={{backgroundImage:`url(${item.img})`}} key={item.name}>
                                <div className="sub_main">
                                    <div className="heading">{item.name}</div>

                                    <div className="ban_detail">
                                        <span id="year">2021</span>
                                        <span id="season">season 1</span>
                                        <span id="ratting">5.9</span>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Nihil doloremque neque quasi fuga debitis saepe magnam.
                                        Quasi ipsa odit id debitis illo aspernatur consectetur pariatur.
                                    </p>
                                    <Link to={item.link}>
                                        <button>Watch Now</button>
                                    </Link>
                                    
                                </div>
                            </div>
                        )
                    })
                }

                {/* <div className="main_is" style={{backgroundImage:`url(${bannerimg1})`}}>
                    <div className="sub_main">
                        <div className="heading">Magnam</div>

                        <div className="ban_detail">
                            <span id="year">2021</span>
                            <span id="season">season 1</span>
                            <span id="ratting">5.9</span>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nihil doloremque neque quasi fuga debitis saepe magnam.
                            Quasi ipsa odit id debitis illo aspernatur consectetur pariatur.
                        </p>
                        <button>Watch Now</button>
                    </div>
                </div> */}
            </div>      
        </>
    )
}

export default Banner;