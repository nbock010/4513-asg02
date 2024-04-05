import { useState, useEffect } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { findFlagUrlByCountryName } from "country-flags-svg";
import WikiImage from './WikiImage';
//^^Huge find; can import images of country flags as icons using the driver's nationality string



const CircuitModal = (props) =>{
    /*props:
    props.idForCircuitModal= props.idForCircuitModal,
    showCircuit=props.showCircuit(raceId),
    props.circuitData={props.circuitData[0] (just use props.circuitData.country/.name/etc) */
    let position = [100,100]

    //BIG THANKS TO mbykovskyy at https://gist.github.com/mbykovskyy/1c67b0b4ba8da9972488
    /**
    * Converts decimal degrees to degrees minutes seconds.
    * 
    * @param dd the decimal degrees value.
    * @param isLng specifies whether the decimal degrees value is a longitude.
    * @return degrees minutes seconds string in the format 49°15'51.35"N
    */
    function convertToDms(dd, isLng) {
        var dir = dd < 0
        ? isLng ? 'W' : 'S'
        : isLng ? 'E' : 'N';
    
        var absDd = Math.abs(dd);
        var deg = absDd | 0;
        var frac = absDd - deg;
        var min = (frac * 60) | 0;
        var sec = frac * 3600 - min * 60;
        // Round it to 2 decimal points.
        sec = Math.round(sec * 100) / 100;
        return deg + "°" + min + "'" + sec + '"' + dir;
    }

    if (props.idForCircuitModal){
        const circuitData = props.circuitData.circuits; //just the one circuit in the object
        console.log(props.circuitData.circuits)
    //console.log(props.idForCircuitModal)
        return(
            <Modal onClose={()=> props.showCircuit(null)}isOpen={props.idForCircuitModal ? true : false}>
                <ModalContent>
                    <ModalHeader id="circuit-dialog-header">
                        <img src={findFlagUrlByCountryName(circuitData.country)} width="60" height="40" alt={circuitData.country + " flag"}/>
                        <h3>{circuitData.name}</h3>
                    </ModalHeader>
                    <ModalBody>
                        <p>{circuitData.location}, {circuitData.country}</p>
                        <p>({convertToDms(circuitData.lat, false)}, {convertToDms(circuitData.lng, true)})</p>
                        <figure>
                            <WikiImage url={circuitData.url} altText={circuitData.name + " image PLACEHOLDER"}/>
                            {/* <img src="https://placehold.co/150x100" alt={circuitData.name + " map PLACEHOLDER"} title="leaflet component TBD"/> */}
                        </figure>
                        
                        <a href={circuitData.url} target="_blank">Wikipedia</a>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={() => props.showCircuit(null)}>Close</button>
                        <button>Favourite</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
    
}

export default CircuitModal