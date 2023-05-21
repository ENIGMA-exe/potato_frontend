import React, { useEffect,useState } from 'react'
import jsCookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import { Mdata_Fetch, Sdata_Fetch } from '../../Action/action';



import SimpleCardSlider from '../../Components/CardSlider-a/SmpCrdSlider';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';
import MediaPlayer from '../../Components/video/MediaPlayer';
import Loader from '../../Components/Loader/Loader';
import './MP.css'


var Media = () => {

    var userState = useSelector(state => state.Authentication)
    var series_data = useSelector(state => state.SD_Operation);
    var movies_data = useSelector(state => state.MV_Operation);

    console.log("series data",series_data)
    console.log("movies data",movies_data)

    const history = useHistory()
    const dispatch = useDispatch()

    //get query data from url
    const query = new URLSearchParams(useLocation().search)

    //updating base-url-key for mediaplayer
    var [urlKey, setUrlKey] = useState("")

    //Setting up episode name for video (while series)
    var [episode,setEpisode] = useState({
        seriesID:"",
        name:"",
        no: 0,
        isSet:false
    })

    // if(query.get('type') === 'series' && !episode.isSet &&  Object.keys(series_data).length !== 0 && series_data !== {}){

    //     var [result_series] = series_data[query.get('genres')].filter((itm) => { return itm.series_id === query.get("id") })

    //     //check rersult_series,undefined or not
    //     //debugging
    //     console.log("media page,if condition 1, series", result_series)
        
    //     setEpisode({
    //         seriesID:result_series.series_id,
    //         name:result_series.episodes[Number(query.get("ep"))-1].episode_name,
    //         no:query.get("ep"),
    //         isSet:true
    //     })
    //     setUrlKey(result_series.episodes[Number(query.get("ep"))-1].episode_URL)

    // }else if(episode.seriesID !== query.get("id") && Object.keys(series_data).length !== 0 && series_data !== {} && query.get('type') === 'series'){
    //     var [result_series] = series_data[query.get('genres')].filter((itm) => { return itm.series_id === query.get("id") })
        
    //     //check rersult_series,undefined or not
    //     //debugging
    //     console.log("media page,if condition 2, series", result_series)

    //     setEpisode({
    //         seriesID:result_series.series_id,
    //         name:result_series.episodes[Number(query.get("ep"))-1].episode_name,
    //         no:query.get("ep"),
    //         isSet:true
    //     })
    //     setUrlKey(result_series.episodes[Number(query.get("ep"))-1].episode_URL)
    // }

    //Suggest movies name for video (while movies)
    var [movie,setMovie] = useState({
        movieID:"",
        name:"",
        isSet: false
    })

    // if(query.get('type') === 'movie' && !movie.isSet && Object.keys(movies_data).length !== 0 && movies_data !== {} && movies_data[query.get("genres")] !== undefined){
    //     var [result_movie] = movies_data[query.get("genres")].filter((itm) => { return itm.movie_id === query.get("id") })
        
    //     //check rersult_movie
    //     //debugging
    //     console.log("media page,if condition , movies 1", result_movie)

    //     setMovie({
    //         movieID:result_movie.movie_id,
    //         name:result_movie.name,
    //         isSet:true
    //     })
    //     setUrlKey(result_movie.movie_URL)

    // }else if(movie.movieID !== query.get("id") && Object.keys(movies_data).length !== 0 && movies_data !== {} && query.get('type') === 'movie'){
    //     [result_movie] = movies_data[query.get("genres")].filter((itm) => { return itm.movie_id === query.get("id") })

    //     //debuggng
    //     console.log("media page,if condition , movies 2", result_movie)

    //     setMovie({
    //         movieID:result_movie.movie_id,
    //         name:result_movie.name,
    //         isSet:true
    //     })
    //     setUrlKey(result_movie.movie_URL)

    // }

    useEffect(() => {
        document.title = "Media page"

        //check login
        if (!userState.isLogin) {
            history.push('/')
        }

        //FETCHING SESRIES DATA
        if (Object.keys(series_data).length === 0 || series_data === {}) {
            dispatch(Sdata_Fetch());
        }

        //FETCHING MOVIES DATA
        if (Object.keys(movies_data).length === 0 || movies_data === {}) {
            dispatch(Mdata_Fetch());
        }

        //set series episode
        //while refreshing
        if(query.get('type') === 'series' && !episode.isSet &&  Object.keys(series_data).length !== 0 && series_data !== {}){

            var limit = query.get("id").split("_")[1]
            var skip = Math.ceil(Number(limit)/12)*12

            if(limit>12) dispatch(Sdata_Fetch(skip.toString()))

            //set cookies , for skip method
            var cookie_data = JSON.parse(jsCookie.get("potato_series_skip"))
            cookie_data = {...cookie_data,[query.get("genres")]:skip}

            jsCookie.set("potato_series_skip",JSON.stringify(cookie_data))

            //console.log("cookies data media page",cookie_data)


            var [result_series] = series_data[query.get('genres')].filter((itm) => { return itm.series_id === query.get("id") })

            //check rersult_series,undefined or not
            //debugging
            console.log("media page,if condition 1, series", result_series)
            
            setEpisode({
                seriesID:result_series.series_id,
                name:result_series.episodes[Number(query.get("ep"))-1].episode_name,
                no:query.get("ep"),
                isSet:true
            })
            setUrlKey(result_series.episodes[Number(query.get("ep"))-1].episode_URL)

        //while clicking different series from the slider
        }else if(episode.seriesID !== query.get("id") && Object.keys(series_data).length !== 0 && series_data !== {} && query.get('type') === 'series'){

            var [result_series] = series_data[query.get('genres')].filter((itm) => { return itm.series_id === query.get("id") })
            
            //check rersult_series,undefined or not
            //debugging
            console.log("media page,if condition 2, series", result_series)

            setEpisode({
                seriesID:result_series.series_id,
                name:result_series.episodes[Number(query.get("ep"))-1].episode_name,
                no:query.get("ep"),
                isSet:true
            })
            setUrlKey(result_series.episodes[Number(query.get("ep"))-1].episode_URL)
        }

        //set movies
        if(query.get('type') === 'movie' && !movie.isSet && Object.keys(movies_data).length !== 0 && movies_data !== {} && movies_data[query.get("genres")] !== undefined){
            var [result_movie] = movies_data[query.get("genres")].filter((itm) => { return itm.movie_id === query.get("id") })
            
            //debugging
            console.log("media page,if condition , movies 1", result_movie)

            setMovie({
                movieID:result_movie.movie_id,
                name:result_movie.name,
                isSet:true
            })
            setUrlKey(result_movie.movie_URL)

        }else if(movie.movieID !== query.get("id") && Object.keys(movies_data).length !== 0 && movies_data !== {} && query.get('type') === 'movie'){
            [result_movie] = movies_data[query.get("genres")].filter((itm) => { return itm.movie_id === query.get("id") })

            //debuggng
            console.log("media page,if condition , movies 2", result_movie)

            setMovie({
                movieID:result_movie.movie_id,
                name:result_movie.name,
                isSet:true
            })
            setUrlKey(result_movie.movie_URL)

        }

    },[series_data,movies_data,episode,movie,dispatch])

    
    var mediaSet = (data,type)=>{
        if(type === "series"){
            setEpisode({
                ...episode,
                name:data.episode_name,
                no:data.episode_no,
            })
            setUrlKey(data.episode_URL)
        }else{
            setMovie({
                movieID:data.movie_id,
                name:data.name,
                isSet:true
            })
            setUrlKey(data.movie_URL)
        }
        
    }

    return (
        <>
            <NavBar />

            <div className="main_1">
                <div className="media">
                    <div className="video">
                        <MediaPlayer urlkey={urlKey}/>
                    </div>

                    <div className="vid_detail">
                        {
                            (query.get('type')==='series')?
                            <p>{episode.name} • Episode {episode.no} </p>
                            :<p>{movie.name} </p>
                        }
                        
                        <p>174,983 views • Oct 27, 2018</p>
                        <div className="others">
                            <p><i className="fas fa-heart"></i>like</p>
                            <p><i className="fas fa-share-alt-square"></i>share</p>
                        </div>
                    </div>

                </div>

                <div className="seri_ep">
                    {
                        (query.get('type') === 'series')?
                            (Object.keys(series_data).length !== 0 && series_data !== {}) ?
                                series_data[query.get("genres")]
                                    .filter((itm) => { return itm.series_id === query.get("id") })
                                    .map((data) => {
                                        
                                        return (
                                            data.episodes.map((episode) => {
                                                return (
                                                    <Link to={`/media?base_url=${episode.episode_URL}&type=series&id=${data.series_id}&genres=${query.get("genres")}&ep=${episode.episode_no}`} key={episode.episode_no + episode.episode_name + data.name}>
                                                        <div className="episode" onClick={()=> mediaSet(episode,"series")}>
                                                            <div className="ep_img">
                                                                <img src={`https://drive.google.com/uc?id=${data.banner_URL}`} alt="no img" className="card_img" />
                                                            </div>
                                                            <div className="ep_cont">
                                                                <p className="ep_no">{`Episode ${episode.episode_no} •`}</p>
                                                                <p className="ep_name">{episode.episode_name}</p>
                                                                <p className="ep_view_and_posd">349K views • 2 years ago</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        )
                                    })

                            : <Loader/>

                        :(Object.keys(movies_data).length !== 0 && movies_data !== {}) ?
                            movies_data[query.get("genres")].map((data) => {
                                return (
                                    <Link to={`/media?base_url=${data.movie_URL}&type=movie&id=${data.movie_id}&genres=${query.get("genres")}`} key={data.movie_id+data.name}>
                                        <div className="episode" onClick={()=> mediaSet(data,'movie')}>
                                            <div className="ep_img">
                                                <img src={`https://drive.google.com/uc?id=${data.banner_URL}`} alt="no img" className="card_img" />
                                            </div>
                                            <div className="ep_cont">
                                                {/* <p className="ep_no">{`Episode ${episode.episode_no} •`}</p> */}
                                                <p className="ep_name">{data.name}</p>
                                                <p className="ep_view_and_posd">349K views • 2 years ago</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })

                            : <Loader/>

                    }
                </div>
            </div>


            <div className="main_2">
                <div className="info">
                    {   
                        
                        (query.get("type")==="series")?
                            (Object.keys(series_data).length !== 0 && series_data !== {}) ?
                                series_data[query.get("genres")]
                                    .filter((itm) => { return itm.series_id === query.get("id") })
                                    .map((data) => {
                                        return (
                                            <>
                                                <div className="seri_detail" key={data.series_id}>
                                                    <div className="seri_img">
                                                        <img src={`https://drive.google.com/uc?id=${data.banner_URL}`} alt="no img"
                                                            className="card_img" />
                                                    </div>

                                                    <div className="seri_bio">
                                                        <div className="bio_jist">
                                                            <div className="value">
                                                                <p>Name</p>
                                                            </div>
                                                            <div className="paire">
                                                                <p>{data.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="bio_jist">
                                                            <div className="value">
                                                                <p>Author</p>
                                                            </div>
                                                            <div className="paire">
                                                                <p>{data.director}</p>
                                                            </div>
                                                        </div>
                                                        <div className="bio_jist">
                                                            <div className="value">
                                                                <p>Year</p>
                                                            </div>
                                                            <div className="paire">
                                                                <p>{data.release_year}</p>
                                                            </div>
                                                        </div>
                                                        <div className="bio_jist">
                                                            <div className="value">
                                                                <p>IMDB Rating</p>
                                                            </div>
                                                            <div className="paire">
                                                                <p>{`${data.imdb} / 10`}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="seri_detail_para">
                                                    <p> {data.description}</p>
                                                </div>
                                            </>
                                        )
                                    })
                                : <Loader/>

                        :   (Object.keys(movies_data).length !== 0 && movies_data !== {}) ?
                                movies_data[query.get("genres")]
                                    .filter((itm) => { return itm.movie_id === query.get("id") })
                                    .map((data) => {
                                        return (
                                            <>
                                                <div className="seri_detail" key={data.movie_id}>
                                                    <div className="seri_img">
                                                        <img src={`https://drive.google.com/uc?id=${data.banner_URL}`} alt="no img"
                                                            className="card_img" />
                                                    </div>

                                                    <div className="seri_bio">
                                                        <div className="bio_jist">
                                                            <div className="value">
                                                                <p>Name</p>
                                                            </div>
                                                            <div className="paire">
                                                                <p>{data.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="bio_jist">
                                                            <div className="value">
                                                                <p>Author</p>
                                                            </div>
                                                            <div className="paire">
                                                                <p>{data.director}</p>
                                                            </div>
                                                        </div>
                                                        <div className="bio_jist">
                                                            <div className="value">
                                                                <p>Year</p>
                                                            </div>
                                                            <div className="paire">
                                                                <p>{data.release_year}</p>
                                                            </div>
                                                        </div>
                                                        <div className="bio_jist">
                                                            <div className="value">
                                                                <p>IMDB Rating</p>
                                                            </div>
                                                            <div className="paire">
                                                                <p>{`${data.imdb} / 10`}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="seri_detail_para">
                                                    <p> {data.description}</p>
                                                </div>
                                            </>
                                        )
                                    })
                                : <Loader/>
                    }

                </div>
                <div className="ads"></div>
            </div>

            {
                (query.get("type") === "series")?
                    series_data[query.get('genres')] !== undefined ? 
                    <SimpleCardSlider type={query.get('type')} genres={query.get('genres')} loader={false} data={series_data[query.get('genres')]}/>
                    :<SimpleCardSlider loader={true}/>

                :   movies_data[query.get('genres')] !== undefined ? 
                    <SimpleCardSlider type={query.get('type')} genres={query.get('genres')} loader={false} data={movies_data[query.get('genres')]}/>
                    :<SimpleCardSlider loader={true}/>

            }
            <Footer />
        </>
    )
}

export default Media;