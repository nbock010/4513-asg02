import { useState, useEffect } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import loadingGif from '../assets/wheel.gif'
//^^ from https://giphy.com/stickers/SKODAPL-tire-skoda-tyre-VbiSHWCqHmNVhipjkh

const LoadingModal = (props) =>{
    //props (from HomeView): isLoading, changeLoadingStatus(true/false)
    return(
        <Modal isOpen={props.isLoading}>
            <ModalContent >
                <ModalHeader>
                    <h2>Loading...</h2>
                </ModalHeader>
                <ModalBody>
                    <img src={loadingGif} width="300" alt="wheel.gif"></img>
                </ModalBody>
            </ModalContent>
        </Modal>



        // <ReactModal className="my-modal" isOpen={props.isLoading}> 
        // {/* USING FALSE AS A TEMP PRECAUTION FOR NOW */}
        //     <div>
        //         <h2>Loading...</h2>
        //         <img src={loadingGif} width="300" alt="wheel.gif"></img>
        //     </div>
        // </ReactModal>
    )
}

export default LoadingModal