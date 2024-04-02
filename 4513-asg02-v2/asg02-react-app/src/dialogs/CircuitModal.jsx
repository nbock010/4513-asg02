import { useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import { findFlagUrlByCountryName } from "country-flags-svg";
//^^Huge find; can import images of country flags as icons using the driver's nationality string


const CircuitModal = (props) =>{
    /*props:
    props.idForCircuitModal= props.idForCircuitModal,
    showCircuit=props.showCircuit(raceId),
    props.circuitData={props.circuitData[0] (just use props.circuitData.country/.name/etc) */
    
    
    if (props.idForCircuitModal){
        const circuitData = props.circuitData.circuits; //just the one circuit in the object
        console.log(props.circuitData.circuits)
    //console.log(props.idForCircuitModal)
        return(
              <ReactModal className="my-modal" isOpen={props.idForCircuitModal ? true : false}
              shouldCloseOnEsc={true}>
                <div id="circuit-dialog-header">
                <img src={findFlagUrlByCountryName(circuitData.country)} width="60" height="40" alt={circuitData.country + " flag"}/>
                    <h3>{circuitData.name}</h3>
                </div>
                <div>
                    <figure>
                        <img src="https://placehold.co/150x100" alt={circuitData.name + " image PLACEHOLDER"}/>
                        <img src="https://placehold.co/150x100" alt={circuitData.name + " map PLACEHOLDER"}/>
                    </figure>
                <a href={circuitData.url} target="_blank">Wikipedia</a>
                </div>
                <div>
                    <button onClick={() => props.showCircuit(null)}>Close</button>
                    <button>Favourite</button>
                </div>

              </ReactModal>
        )
    }
    
}

export default CircuitModal