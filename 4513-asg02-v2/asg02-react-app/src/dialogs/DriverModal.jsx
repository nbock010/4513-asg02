// import { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { findFlagUrlByNationality } from "country-flags-svg";
import WikiImage from './WikiImage.jsx'
//^^Huge find; can import images of country flags as icons using the driver's nationality string
import {BsFillHeartFill} from 'react-icons/bs'

const DriverModal = (props) => {
    //props: idForDriverModal=props.idForDriverModal, props.showDriver(id), props.driverData, 
    //props.faveDrivers, props.addFaveDriver
    //NOTE: driver data returns the object that CONTAINS the driver, not just the driver itself

    /*thank you user codeandcloud at 
        https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd*/
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    if (props.idForDriverModal) {
        const driver = props.driverData.driver
        let dob = new Date(driver.dob).toDateString() //for easier calculation
        const flagUrl = findFlagUrlByNationality(driver.nationality);

        return (
            // the truthiness of a passed value makes this open
            <Modal onClose={() => props.showDriver(null)} isOpen={props.idForDriverModal ? true : false} isDismissable={false}>
                <ModalContent>
                    <ModalHeader id="driver-dialog-header">
                        <img src={flagUrl} width="60" height="40" alt={driver.nationality + " flag"}></img>
                        <h3>{driver.forename + " " + driver.surname}</h3>
                    </ModalHeader>
                    <ModalBody>
                        <figure>
                            <WikiImage url={driver.url} altText={driver.forename + " " + driver.surname} />
                        </figure>
                        <p>{"Born " + dob + " (" + getAge(dob) + " years old)"}
                            <br />
                            <a href={driver.url} target="_blank">Wikipedia</a></p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => props.addFaveDriver(driver.forename + " " + driver.surname)}><BsFillHeartFill/>Favourite</Button>
                        <Button onClick={() => props.showDriver(null)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
}


export default DriverModal