import Loading_squre from './Loading_squares.png'
import './LO.css'

export default function Loader(){
    return(
        <>
            <div className="page-loader">
                <img src={Loading_squre} alt=""/>
            </div>
        </>
    )
}