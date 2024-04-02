import { useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import { findFlagUrlByNationality } from "country-flags-svg";
import WikiImage from './WikiImage.jsx'
//^^Huge find; can import images of country flags as icons using the driver's nationality string

const DriverModal = (props) => {
    //props: idForDriverModal=props.idForDriverModal, props.showDriver(id), props.driverData
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
        // console.log(flagUrl)

        return (
            //the truthiness of a passed value makes this open
            <ReactModal className="my-modal" isOpen={props.idForDriverModal ? true : false}
                shouldCloseOnEsc={true}>
                <div id="driver-dialog-header">
                    <img src={findFlagUrlByNationality(driver.nationality)} width="60" height="40" alt={driver.nationality + " flag"}></img>
                    <h3>{driver.forename + " " + driver.surname}</h3>
                </div>
                <div>
                    <p>{"Born " + dob + " (" + getAge(dob) + " years old)"} </p>
                    <figure>
                        <WikiImage url={driver.url} altText={driver.forename + " " + driver.surname}/>
                    </figure>
                    <a href={driver.url} target="_blank">Wikipedia</a>
                </div>
                <div>
                    <button onClick={() => props.showDriver(null)}>Close</button>
                    <button>Favourite</button>
                </div>

            </ReactModal>
        )
    }
}


export default DriverModal