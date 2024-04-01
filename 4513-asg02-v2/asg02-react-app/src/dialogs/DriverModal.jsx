import { useState, useEffect } from 'react'
import ReactModal from 'react-modal'

/*
possibly needed in index, but seems to work okay without it???
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-modal/3.14.3/react-modal.min.js"
    integrity="sha512-MY2jfK3DBnVzdS2V8MXo5lRtr0mNRroUI9hoLVv2/yL3vrJTam3VzASuKQ96fLEpyYIT4a8o7YgtUs5lPjiLVQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
*/

const DriverModal = (props) => {
    //idForDriverModal=props.idForDriverModal, props.showDriver(id)


    console.log("driver modal: printing to console! " + props.idForDriverModal)
    if (props.idForDriverModal) {
        return (
            //the truthiness of a passed value makes this open
            <ReactModal className="my-modal" isOpen={props.idForDriverModal ? true : false}
                shouldCloseOnEsc={true}
                contentLabel="HEYY FUCCBOI">
                <p>buenos dias fuccboi</p>
                <div>
                    <h4>Driver Details</h4>
                    <h5>Name</h5>
                    <p>nationality; dob (age) </p>
                    <a href="#">Wikipedia</a>
                </div>
                <button onClick={() => props.showDriver(null)}>Close</button>
                <button>Favourite</button>
            </ReactModal>


            //     <div>
            //         {/* close window? */}
            //         <button onClick={props.closeDriverDialog}>Close</button>
            //         
            //     </div>


        )
    }


}

export default DriverModal