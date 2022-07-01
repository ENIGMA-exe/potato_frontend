import React from 'react';
import { Link } from 'react-router-dom';
import './BCS.css';


var BannerCardSlider = (props) => {

    return (
        <>
            <div className="contener-B" id="section_name">
                <div className="hover_detail">
                    <div className="contener_detail">
                        <p>{props.type} / {props.genres}</p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Cupiditate modi sint natus voluptatem architecto inventore
                            nemo quidem harum optio ipsum a praesentium in, culpa possimus
                            itaque consequuntur, eligendi excepturi doloribus.
                        </p>
                        <button>Watch Now</button>
                        <button className='get-more'>More</button>
                    </div>
                </div>
                <div className="card_section">

                    {
                        !props.loader ? 
                        props.data.map((item)=>{
                            return(
                                <div className="card" key={item.movie_id}>
                                    <div className="h_detail">
                                        <p>{item.name}</p>
                                        <p>{`IMDB - ${item.imdb} / 10`}</p>
                                        <Link to={`/media?base_url=${item.movie_URL}&type=${props.type}&id=${item.movie_id}&genres=${props.genres}`}>
                                            <button>Watch now</button>
                                        </Link>
                                    </div>
                                    <img src={`https://drive.google.com/uc?id=${item.banner_URL}`} alt="no img" className="card_img" />
                                </div>
                            )
                        }):<p>NO DATA</p>
                    }
                    {/* <div className="card_more">
                        <button>More..</button>
                    </div> */}
                </div>
            </div>
        </>
    )
}
export default BannerCardSlider;