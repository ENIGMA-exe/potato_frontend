import React ,{memo, useRef, useState} from 'react'
import $ from 'jquery';
import { NavLink, Link, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import  axios  from 'axios';


import './NB.css';
import logo from './pokiball.png'
import img from './data_finding.png'
import { UlogOut } from '../../Action/action';

require('dotenv').config()

var debouncing = (callback,threshold)=>{
    var timer;
    return function(){
        //const context = this

        if(timer)clearTimeout(timer);
        timer = setTimeout(()=>{
            timer = null;
            //callback.apply(context);
            callback()
        },threshold);
    }
}


var NavBar = () => {

    const userState = useSelector(state => state.Authentication)
    const dispatch = useDispatch()
    const history = useHistory()

    var SerBox = ()=>{
        $(".main_s").css("display", "flex").hide().fadeIn(400);
    }

    var DivClose = ()=>{
        $(".main_s").fadeOut("fast");
        setSearchData(undefined)
        input_ref.current.value = "";
    }

    var logout_function = ()=>{
        dispatch(UlogOut())
        history.push('/')
    }
//...............searching function.....................
    var input_ref = useRef(null)
    var [searchData,setSearchData] = useState(undefined)
    
    var handleSearch = debouncing(async ()=>{
        //console.log(`${process.env.REACT_APP_SER_API}${input_ref.current.value}`)

        if(input_ref.current.value !== "" & input_ref.current.value.trim() !== ""){
            var result = await axios.get(`${process.env.REACT_APP_SER_API}${input_ref.current.value}`)

            if(result.data === 'NDF'){
                //console.log('no data found')
                setSearchData(undefined)
            }else{
                setSearchData(result.data)
            }
        }else{
            setSearchData(undefined)
        }
        
    },300)

    

    return (
        <>

            {/* SEARCH BOX */}

            <div className="main_s">
                <div className="search_box">

                    <div className="close" onClick={DivClose}>close</div>

                    <div className="search_bar">
                        <input type="text" placeholder="search" ref={input_ref} onChange={handleSearch} />
                    </div>

                    <div className="search_content">

                        
                        {
                            (searchData === undefined)&&<img src={img} id='sc_img' alt=''/>
                        }

                        {/* <div className="s_card" key={'one'}>
                            <div className="h_detail">
                                <p>Temp data</p>
                                <p>{`IMDB - 9.1 / 10`}</p>
                                <Link to={`none`}>
                                    <button>Watch now</button>
                                </Link>
                            </div>
                            <img src={`https://drive.google.com/uc?id=1LfhaUOesZyqWPNItBUZNyNijHRmCdPVr`} alt="no img" className="card_img" />
                        </div> */}

                        {
                            (searchData !== undefined)&&

                                /* console.log(searchData.movies.length) */
                                
                                (searchData.movies.length !== 0)&&
                                    //console.log(searchData.movies)
                                    searchData.movies.map((movie)=>{
                                        return(
                                            <>
                                                <div className="s_card" key={movie.movie_id}>
                                                    <div className="h_detail">
                                                        <p>{movie.name}</p>
                                                        <p>{`IMDB - ${movie.imdb} / 10`}</p>
                                                        <Link to={`/media?base_url=${movie.movie_URL}&type=movie&id=${movie.movie_id}&genres=${movie.genres[0]}`}>
                                                            <button>Watch now</button>
                                                        </Link>
                                                    </div>
                                                    <img src={`https://drive.google.com/uc?id=${movie.banner_URL}`} alt="no img" className="card_img" />
                                                </div>
                                            </>
                                        )
                                    })
                        }

                        {
                            (searchData !== undefined)&&
                            (searchData.series.length !== 0)&&
                                searchData.series.map((series)=>{
                                    return(
                                        <>
                                            <div className="s_card" key={series.series_id}>
                                                <div className="h_detail">
                                                    <p>{series.name}</p>
                                                    <p>{`IMDB - ${series.imdb} / 10`}</p>
                                                    <Link to={`/media?base_url=${series.episodes[0].episode_URL}&type=series&id=${series.series_id}&genres=${series.genres[0]}&ep=1`}>
                                                        <button>Watch now</button>
                                                    </Link>
                                                </div>
                                                <img src={`https://drive.google.com/uc?id=${series.banner_URL}`} alt="no img" className="card_img" />
                                            </div>

                                        </>
                                    )
                                })
                            
                        }
                    </div>
                </div>
            </div>

            {/* NavBar */}

            <nav>
                <div className="logo">
                    <img src={logo} alt=""/>
                    <div className ="name">Potato</div>
                </div>
                {/* <!-- <div className="name">big potato</div> --> */}
                <ul>
                    
                    <NavLink to={"/home"}><li>Home</li></NavLink>
                    <NavLink to={"/genres?type=series&genres=horror"}><li>Genres</li></NavLink>
                    <NavLink to={"/aboutus"}><li>About</li></NavLink>
                    
                </ul>
                <div className="search" onClick={SerBox}>
                    search
                    <i className="fab fa-searchengin"></i>
                </div>
                <div className="u_name">
                    
                    <Link to={'/profile'}>
                        <p>{userState.userData.fname}</p>
                    </Link>
                    
                    <i className="far fa-user"></i>
                </div>

                <div className="lout" onClick={()=>{logout_function()}}>
                    <p>Logout</p>
                </div>
            </nav>
        </>
    )
}

export default memo(NavBar);