import React, {  useEffect, useRef,  } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { append_mdata, append_sdata, getDBRecord, Mdata_Fetch, Sdata_Fetch, set_movies_fatchable_false, set_series_fatchable_false } from '../../Action/action';
import axios from 'axios';
import jsCookie from 'js-cookie';

//COMPONENTS
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';
import './GN.css';
import Loader from '../../Components/Loader/Loader';
import Cookies from 'js-cookie';

require('dotenv').config()

//..................Debouncing function...............
function debouncing(call, d) {
    let timer;
    return function (...args) {
        const context = this
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            //call()
            timer = null;
            call.apply(context, args)
            //call()
        }, d);
    }
}

const Genres = () => {

    var card_section_ref = useRef(null)

    var series_data = useSelector(state => state.SD_Operation);
    var DB_record = useSelector(state => state.DBrecord);
    var movies_data = useSelector(state => state.MV_Operation);
    var series_fatchable = useSelector(state => state.Series_dynamic_fatching)

    var userState = useSelector(state => state.Authentication)
    var history = useHistory()
    var dispatch = useDispatch()

    //get query data
    var query = new URLSearchParams(useLocation().search)
    
    //setting up cookies to its initial values on refresh
    window.onbeforeunload = ()=>{
        jsCookie.set("potato_series_skip", JSON.stringify({horror: 12,comedi: 12,romantic: 12}))
        jsCookie.set("potato_movies_skip", JSON.stringify({horror: 12,comedi: 12,romantic: 12}))
    }
    //skip for series nd mocvies
    if (!jsCookie.get("potato_series_skip")){ 

        jsCookie.set("potato_series_skip", JSON.stringify({
            horror: 12,
            comedi: 12,
            romantic: 12
        }))

        jsCookie.set("potato_movies_skip", JSON.stringify({
            horror: 12,
            comedi: 12,
            romantic: 12
        }))
    }

    jsCookie.set("genres", query.get("genres"))
    jsCookie.set("type", query.get("type"))


    var betterFunction = debouncing(async () => {
        
        if (series_fatchable[jsCookie.get("genres")] & Cookies.get("type") === "series") {
            
            try {
                var cookies_data = JSON.parse(jsCookie.get("potato_series_skip"))

                var result = await axios.get(`${process.env.REACT_APP_SD_API}${jsCookie.get("genres")}?limit=12&skip=${cookies_data[jsCookie.get("genres")]}`)
                // console.log(jsCookie.get("genres"), cookies_data[jsCookie.get("genres")])

                if (result.data.length === 0) {
                    dispatch(set_series_fatchable_false(jsCookie.get("genres")))
                } else {
                    cookies_data = { ...cookies_data, [jsCookie.get("genres")]: cookies_data[jsCookie.get("genres")] + 12 }
                    jsCookie.set("potato_series_skip", JSON.stringify(cookies_data))
                    dispatch(append_sdata({
                        genTyp: query.get("genres"),
                        data: result.data
                    }))
                }
            } catch (e) {
                console.log('error in dynamic data fetching series', e)
            }
        }else{
            try {
                cookies_data = JSON.parse(jsCookie.get("potato_movies_skip"))

                result = await axios.get(`${process.env.REACT_APP_MD_API}${jsCookie.get("genres")}?limit=12&skip=${cookies_data[jsCookie.get("genres")]}`)
                // console.log(jsCookie.get("genres"), cookies_data[jsCookie.get("genres")])

                if (result.data.length === 0) {
                    dispatch(set_movies_fatchable_false(jsCookie.get("genres")))
                } else {
                    cookies_data = { ...cookies_data, [jsCookie.get("genres")]: cookies_data[jsCookie.get("genres")] + 12 }
                    jsCookie.set("potato_movies_skip", JSON.stringify(cookies_data))
                    dispatch(append_mdata({
                        genTyp: query.get("genres"),
                        data: result.data
                    }))
                }
            } catch (e) {
                console.log('error in dynamic data fetching movies', e)
            }

        }


    }, 300)

    useEffect(() => {
        document.title = "Get More"

        //CHEKING USER AUTH
        if (!userState.isLogin) {
            history.push('/')
        }

        //FETCHING DB RECORD
        if (Object.keys(DB_record).length === 0 || DB_record === {}) {
            dispatch(getDBRecord());
        }

        //FETCHING SESRIES DATA
        if (Object.keys(series_data).length === 0 || series_data === {}) {
            dispatch(Sdata_Fetch());
        }

        //FETCHING MOVIES DATA
        if (Object.keys(movies_data).length === 0 || movies_data === {}) {
            dispatch(Mdata_Fetch())
        }
    },)

    function goTop(){
        card_section_ref.current.scrollTo(0,0)
    }


    return (
        <>
            <NavBar />
            <div className="typography">
                {query.get("type")}
            </div>
            <div className="genmain">

                <div className="geners" onClick={goTop}>
                    <ul>
                        <li>
                            <Link to={`/genres?type=movie&genres=${query.get("genres")}`}>
                                <div>Movie</div>
                            </Link>
                            <Link to={`/genres?type=series&genres=${query.get("genres")}`}>
                                <div>Anime Series</div>
                            </Link>
                        </li>
                        <Link to={`/genres?type=${query.get("type")}&genres=horror`}>
                            <li>Horror</li>
                        </Link>
                        <Link to={`/genres?type=${query.get("type")}&genres=comedi`}>
                            <li>Comedy</li>
                        </Link>
                        <Link to={`/genres?type=${query.get("type")}&genres=romantic`}>
                            <li>Romantic</li>
                        </Link>
                        <Link to={`/genres?type=${query.get("type")}&genres=action`}>
                            <li>Action</li>
                        </Link>
                        <Link to={`/genres?type=${query.get("type")}&genres=adventure`}>
                            <li>Adventure</li>
                        </Link>
                        <Link to={`/genres?type=${query.get("type")}&genres=drama`}>
                            <li>Drama</li>
                        </Link>
                        <Link to={`/genres?type=${query.get("type")}&genres=magic`}>
                            <li>Magic</li>
                        </Link>
                        <Link to={`/genres?type=${query.get("type")}&genres=mystery`}>
                            <li>Mystery</li>
                        </Link>
                    </ul>
                </div>

                <div className="card_sc" ref={card_section_ref} onScroll={betterFunction}>
                    {
                        (query.get('type') === 'series') ?
                            (Object.keys(series_data).length !== 0 && series_data !== {}) ?
                                series_data[query.get("genres")].map((data) => {
                                    return (
                                        <div className="g_card" key={data.series_id}>
                                            <div className="h_detail">
                                                <p>{data.name}</p>
                                                <p>{`IMDB - ${data.imdb} / 10`}</p>
                                                <Link to={`/media?base_url=${data.episodes[0].episode_URL}&type=series&id=${data.series_id}&genres=${query.get("genres")}&ep=1`}>
                                                    <button>Watch now</button>
                                                </Link>
                                            </div>
                                            <img src={`https://drive.google.com/uc?id=${data.banner_URL}`} alt="no img" className="card_img" />
                                        </div>
                                    )
                                })
                                : <Loader />

                            : (Object.keys(movies_data).length !== 0 && movies_data !== {}) ?
                                movies_data[query.get("genres")].map((data) => {
                                    return (
                                        <div className="g_card" key={data.movie_id}>
                                            <div className="h_detail">
                                                <p>{data.name}</p>
                                                <p>{`IMDB - ${data.imdb} / 10`}</p>
                                                <Link to={`/media?base_url=${data.movie_URL}&type=movie&id=${data.movie_id}&genres=${query.get("genres")}`}>
                                                    <button>Watch now</button>
                                                </Link>
                                            </div>
                                            <img src={`https://drive.google.com/uc?id=${data.banner_URL}`} alt="no img" className="card_img" />
                                        </div>
                                    )
                                })
                                : <Loader />
                    }

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Genres;