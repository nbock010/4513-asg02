import { useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import { findFlagUrlByNationality } from "country-flags-svg";
//^^Huge find; can import images of country flags as icons using the driver's nationality string

const ConstructorModal = (props) =>{
//idForConstructorModal={idForConstructorModal} showConstructor={showConstructor}
//constructorData={props.constructorStandingssData.find((c) => c.constructor.constructorId == idForConstructorModal)}
    if (props.idForConstructorModal){
        console.log(props.constructorData)
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
                    <figure>
                        <img src="https://placehold.co/150x100" alt={constructor.name + " logo PLACEHOLDER"}/>
                    </figure>
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