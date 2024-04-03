import { useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import loadingGif from '../assets/wheel.gif'
//^^ from https://giphy.com/stickers/SKODAPL-tire-skoda-tyre-VbiSHWCqHmNVhipjkh

const LoadingModal = (props) =>{
    //props (from HomeView): isLoading, changeLoadingStatus(true/false)
    return(
        <ReactModal className="my-modal" isOpen={false}> 
        {/* USING FALSE AS A TEMP PRECAUTION FOR NOW */}
            <div>
                <h2>Loading...</h2>
                <img src={loadingGif} width="300" alt="wheel.gif"></img>
            </div>
        </ReactModal>
    )
}

export default LoadingModal