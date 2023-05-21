// import Loading_squre from './Loading_squares.png'
import './LO.css'
import { Dna } from 'react-loader-spinner'

export default function Loader(){
    return(
        <>
            <div className="page-loader">
                <Dna
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        </>
    )
}