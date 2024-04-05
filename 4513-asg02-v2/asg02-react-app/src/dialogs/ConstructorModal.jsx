import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import WikiImage from './WikiImage';
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
            <Modal onClose={()=> props.showConstructor(null)}isOpen={props.idForConstructorModal ? true : false} 
                isDismissable={false}>
                
                <ModalContent>
                    <ModalHeader id="constructor-dialog-header">
                        <img src={findFlagUrlByNationality(constructor.nationality)} width="60" height="40" alt={constructor.nationality + " flag"}/>
                        <h3>{constructor.name}</h3>
                    </ModalHeader>
                    <ModalBody>
                        <figure>
                            <WikiImage url={constructor.url} altText={constructor.name + " logo PLACEHOLDER"}/>
                        </figure>
                        <a href={constructor.url} target="_blank">Wikipedia</a>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={() => props.showConstructor(null)}>Close</button>
                        <button>Favourite</button>
                    </ModalFooter>
                </ModalContent>
                
            </Modal>
            )
    }
    
    
}

export default ConstructorModal