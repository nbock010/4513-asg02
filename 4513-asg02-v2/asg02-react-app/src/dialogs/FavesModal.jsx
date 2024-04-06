/**Until there is something in the favorites collection (see below), the Favorites button should be disabled.
If there are favorites, then display the Favorites modal/dialog (see below).*/
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,
    Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";

const FavesModal = (props) => {
    /*props: props.isShowingFaves, props.showFaves(bool),
     props.faves (see below), props.addFaveDriver(name), props.addFaveConstructor(name), 
     props.addFaveCircuit(name), props.emptyFaves
     
     Faves: {
        drivers:[drivers' FULL names as strings], constructors:[constructors' names as strings], circuits:[circuits' names as strings]
    }*/
    return(
        <Modal isOpen={props.isShowingFaves} onClose={()=> props.showFaves(false)}
        isDismissable={false}>
            <ModalContent>
                <ModalHeader>
                    <h3>Favourites</h3>
                </ModalHeader>
                <ModalBody className="flex-row">

                    {/* DRIVERS */}
                    <Table aria-label="fave drivers" removeWrapper isHeaderSticky>
                        <TableHeader>
                            <TableColumn>Drivers</TableColumn>
                        </TableHeader>
                        <TableBody>

                            {props.faves.drivers.map((d, indx) =>
                                <TableRow key={indx}>
                                    <TableCell>{d}</TableCell> 
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* CONSTRUCTORS */}
                    <Table aria-label="fave constructors" removeWrapper isHeaderSticky>
                        <TableHeader>
                            <TableColumn>Constructors</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {props.faves.constructors.map((c, indx) =>
                                <TableRow key={indx}>
                                    <TableCell>{c}</TableCell> 
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* CIRCUITS */}
                    <Table aria-label="fave circuits" removeWrapper isHeaderSticky>
                        <TableHeader>
                            <TableColumn>Circuits</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {props.faves.circuits.map((c, indx) =>
                                <TableRow key={indx}>
                                    <TableCell>{c}</TableCell> 
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=> 
                        confirm("Are you sure you want to clear your favourites?") ? props.emptyFaves() : {}}>Clear Favourites</Button>
                    <Button onClick={() => props.showFaves(false)}>Close</Button>
                </ModalFooter>
            </ModalContent>
            
            
        </Modal>
    )
}

export default FavesModal