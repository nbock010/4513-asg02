/*he About button should display a modal dialog (see
below) that displays your names, a link to the github repo for the source code, and a brief description of
the project and the technology it is using.*/

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, } from "@nextui-org/react";

const AboutModal = (props) => {
    //props: props.isShowingAbout, props.showAbout(bool)
    return (
        <Modal isOpen={props.isShowingAbout} onClose={() => props.showAbout(false)}
            isDismissable={false}>
            <ModalContent>
                <ModalHeader className="flex-col">
                    <h3>About</h3>
                    <h5>Developer: Noah Bockmuehl</h5>
                </ModalHeader>
                <ModalBody>
                    <p><b>About the project</b></p>
                    <section className="bg-slate-200">
                        This project accesses a database hosted by Supabase with information about F1 race results, drivers, constructors (i.e. brands),
                        circuits, etc. from 2000-2023. The app is built using Node, React, Tailwind, and NextUI.
                        <br />
                        <br />
                        It was created for the COMP-4513 (Web III: Advanced Web Development) course at Mount Royal University
                        (instructed under Randy Connolly).
                        <br />
                        <br />
                        {'>'}<a href="https://github.com/nbock010/4513-asg02" target="_blank">Project GitHub repo</a>

                    </section>
                    <p><b>Special thanks</b></p>
                    <section className="bg-slate-200">
                        <ul>
                            <li>{'>'} Latitude/longitude function from mbkovskyy at<a href="https://gist.github.com/mbykovskyy/1c67b0b4ba8da9972488"
                                target="_blank"> GitHub</a></li>
                            <li>{'>'} Loading wheel gif from SKODA at <a href="https://giphy.com/stickers/SKODAPL-tire-skoda-tyre-VbiSHWCqHmNVhipjkh" target="_blank"> Giphy</a></li>
                            <li>{'>'} Country flag SVG package from danalloway at <a href="https://www.npmjs.com/package/react-country-flag" target="_blank"> npmjs.com</a></li>
                            <li>{'>'} Driver, Circuit, and constructor images from the <a href="https://api.wikimedia.org/wiki/Main_Page" target="_blank">Wikimedia API</a></li>
                            <li>{'>'} Background image: toine G at
                                <a href="https://unsplash.com/photos/time-lapse-photography-of-car-on-road-XP-J5O6A4Ko" target="_blank"> unsplash.com</a></li>
                            <li>{'>'} Icons from <a href="https://react-icons.github.io/react-icons" target="_blank">React Icons on GitHub</a></li>
                        </ul>
                    </section>



                </ModalBody>
                <ModalFooter>
                    <p className="flex-col">
                    </p>
                    <Button onClick={() => props.showAbout(false)}>Close</Button>
                </ModalFooter>
            </ModalContent>


        </Modal>
    )
}

export default AboutModal