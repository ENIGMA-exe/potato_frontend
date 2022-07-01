import React from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Mdata_Fetch, Sdata_Fetch } from '../../Action/action';

import './SCS.css';




var SimpleCardSlider = (props) => {

    // useEffect(()=>{
    // },[])

    var goUP = ()=>{
        window.scrollTo(0,0);
    }
    
    return (
        <>
            <div className="contener" id="section_name">
                <p>{`${props.type} / ${props.genres}`}</p>

                <Link to={`/genres?type=${props.type}&genres=${props.genres}`}>
                    <p className='get-more'>More</p>
                </Link>
                

                <div className="card_section">
                

                    {   
                        (props.type === 'series')?
                            !props.loader ? 
                            props.data.map((item)=>{
                                return(
                                    <div className="card" key={item.series_id}>
                                        <div className="h_detail">
                                            <p>{item.name}</p>
                                            <p>{`IMDB - ${item.imdb} / 10`}</p>
                                            <Link to={`/media?base_url=${item.episodes[0].episode_URL}&type=${props.type}&id=${item.series_id}&genres=${props.genres}&ep=1`}>
                                                <button onClick={() => goUP()}>Watch now</button>
                                            </Link>
                                        </div>
                                        <img src={`https://drive.google.com/uc?id=${item.banner_URL}`} alt="no img" className="card_img" />
                                    </div>
                                )
                            }):<p>NO DATA SERIES</p>

                        :   !props.loader ? 
                            props.data.map((item)=>{
                                return(
                                    <div className="card" key={item.movie_id}>
                                        <div className="h_detail">
                                            <p>{item.name}</p>
                                            <p>{`IMDB - ${item.imdb} / 10`}</p>
                                            <Link to={`/media?base_url=${item.movie_URL}&type=${props.type}&id=${item.movie_id}&genres=${props.genres}`}>
                                                <button onClick={() => goUP()}>Watch now</button>
                                            </Link>
                                        </div>
                                        <img src={`https://drive.google.com/uc?id=${item.banner_URL}`} alt="no img" className="card_img" />
                                    </div>
                                )
                            }):<p>NO DATA MOVIES</p>
                    }

                    {/* <div className="card_more">
                        <button>More..</button>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default SimpleCardSlider;