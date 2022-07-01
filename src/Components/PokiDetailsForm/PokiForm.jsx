import React from 'react'
import './PF.css';

var PokiDetailsForm = () => {
    return (
        <>
            <div className="detail-main">
                <div className="close">close</div>

                <div className="detail-sub-main-1">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="" />
                </div>

                <div className="detail-sub-main-2">

                    <div className="blocks">
                        <div className="iblock">Name</div>
                        <div className="iblock"></div>
                    </div>
                    <div className="blocks">
                        <div className="iblock">Type</div>
                        <div className="iblock"></div>
                    </div>
                    <div className="blocks">
                        <div className="iblock">Height</div>
                        <div className="iblock"></div>
                    </div>
                    <div className="blocks">
                        <div className="iblock">Total Moves</div>
                        <div className="iblock"></div>
                    </div>

                    <div className="blocks">
                        <button><i className="fas fa-heart"></i>Like</button>
                        <button>Dislike<i className="fas fa-thumbs-down"></i></button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PokiDetailsForm;