import { useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import { findFlagUrlByNationality } from "country-flags-svg";
//^^Huge find; can import images of country flags as icons using the driver's nationality string

const ConstructorModal = (props) =>{


    if (props.idForConstructorModal){
        const constructor = props.constructorData.constructor
        const flagUrl = findFlagUrlByNationality(constructor.nationality);

        return(
            <ReactModal className="my-modal" isOpen={props.idForConstructorModal ? true : false}
                shouldCloseOnEsc={true}>
                <div id="constructor-dialog-header">
                    <img src={findFlagUrlByNationality(constructor.nationality)} width="60" height="40" alt={constructor.nationality + " flag"}/>
                    <h3>{constructor.name}</h3>
                </div>
                <div>
                    <img src="https://placehold.co/150x100" alt={constructor.name + " logo PLACEHOLDER"}/>
                    <a href={constructor.url}>Wikipedia</a>
                </div>
                <div>
                        <button onClick={() => props.showConstructor(null)}>Close</button>
                        <button>Favourite</button>
                    </div>

            </ReactModal>
            )
    }
    
}

export default ConstructorModal