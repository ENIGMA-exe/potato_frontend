import React ,{useEffect}from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDBRecord, Mdata_Fetch, Sdata_Fetch } from '../../Action/action';


// IMPORTING COMPONENTS
import './Home.css';
import Banner from '../../Components/BannerHeader/BannerHeader';
import SimpleCardSlider from '../../Components/CardSlider-a/SmpCrdSlider';
import BannerCardSlider from '../../Components/CardSlider-b/BnrCrdSlider';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';


var HomePage = () => {

    var userState = useSelector(state => state.Authentication);
    var series_data = useSelector(state => state.SD_Operation);
    var DB_record = useSelector(state => state.DBrecord);
    var movies_data = useSelector(state => state.MV_Operation);

    var history = useHistory()
    var dispatch = useDispatch();

    useEffect(()=>{
        document.title = "Home"

        //CHEKING USER AUTH
        if(!userState.isLogin){
            history.push('/')
        }
        
        //FETCHING DB RECORD
        if(Object.keys(DB_record).length === 0 || DB_record === {}){
            dispatch(getDBRecord());
        }
        

        //FETCHING SESRIES DATA
        if(Object.keys(series_data).length === 0 || series_data === {}){
            dispatch(Sdata_Fetch());
        }

        //FETCHING MOVIES DATA
        if(Object.keys(movies_data).length === 0 || movies_data === {}){
            dispatch(Mdata_Fetch())
        }

    },)

    return (
        <>
            <NavBar />
            <Banner />

            {
                series_data.horror !== undefined ? <SimpleCardSlider type="series" genres='horror' loader={false} data={series_data.horror}/> :<SimpleCardSlider loader={true}/>

            }
            {
                movies_data.horror !== undefined?
                <BannerCardSlider type='movie' genres='horror' loader={false} data={movies_data.horror}/>
                :<BannerCardSlider loader={true}/>
            }
            
            {
                series_data.comedi !== undefined ? <SimpleCardSlider type="series" genres='comedi' loader={false} data={series_data.comedi}/> :<SimpleCardSlider loader={true}/>
            }
            {
                series_data.romantic !== undefined ? <SimpleCardSlider type="series" genres='romantic' loader={false} data={series_data.romantic}/> :<SimpleCardSlider loader={true}/>
            }

            {
                movies_data.comedi !== undefined?
                <BannerCardSlider type='movie' genres='comedi' loader={false} data={movies_data.comedi}/>
                :<BannerCardSlider loader={true}/>
            }

            <Footer />
        </>
    )
}

export default HomePage;