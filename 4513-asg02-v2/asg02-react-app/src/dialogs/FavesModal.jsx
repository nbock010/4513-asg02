/**Until there is something in the favorites collection (see below), the Favorites button should be disabled.
If there are favorites, then display the Favorites modal/dialog (see below).*/
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,
    Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/react";

const FavesModal = (props) => {
    /*props: props.isShowingFaves, props.showFaves(bool),
     props.faves (see below), props.addFaveDriver(name), props.addFaveConstructor(name), 
     props.addFaveCircuit(name), props.emptyFaves*/
    return(
        <Modal isOpen={props.isShowingFaves} onClose={()=> props.showFaves(false)}
        isDismissable={false}>
            <ModalContent>
                <ModalHeader>
                    <h3>Favourites</h3>
                </ModalHeader>
                <ModalBody className="flex-row">

                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=> 
                        confirm("Are you sure you want to clear your favourites?") ? props.emptyFaves : {}}>Clear Favourites</Button>
                    <Button onClick={() => props.showFaves(false)}>Close</Button>
                </ModalFooter>
            </ModalContent>
            
            
        </Modal>
    )
}

export default FavesModal