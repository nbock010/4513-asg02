import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/react";
const QualifyingViewer = (props) => {
    /*props (from ResStnView): qualifyingData={props.qualifyingData} 
    showDriver={showDriver} idForDriverModal={idForDriverModal}
    showConstructor=props.showConstructor(id)
    
    */

    // function passDriverId(data) {
    //     props.showDriver(data)
    // }

    if (props.qualifyingData.length <= 1) {
        //in app, an empty query will instead return the data to just be a string, "0" which has a length of 1
        return (
            <div>
                <p id="no-qualifying-p">No qualifying data found for this race.</p>
            </div>
        )
    }
    else {
        return (
            <div id="qualifying-table" className="table-wrapper" >
                <Table aria-label="qualifying table" removeWrapper isHeaderSticky >
                <TableHeader>
                    <TableColumn>Pos.</TableColumn>
                    <TableColumn>Racer</TableColumn>
                    <TableColumn>Constructor</TableColumn>
                    <TableColumn>Q1</TableColumn>
                    <TableColumn>Q2</TableColumn>
                    <TableColumn>Q3</TableColumn>
                </TableHeader>
                <TableBody >
                    {props.qualifyingData.map((d, indx) =>
                        <TableRow key={indx}  className='bg-default'>
                            <TableCell>{d.position}</TableCell>
                            {/* I'll be honest here, I needed a little reminder with the help of chatGPT to properly pass the driverId... */}
                            <TableCell>
                                <a className="clickable" onClick={() => props.showDriver(d.driver.driverId)} data={d.driver.driverId}>
                                    {d.driver.forename + " " + d.driver.surname}
                                </a>
                            </TableCell>
                            <TableCell>
                                <a className="clickable" onClick={() => props.showConstructor(d.constructor.constructorId)}>
                                    {d.constructor.name}
                                </a>
                            </TableCell>
                            <TableCell>{(d.q1 ? d.q1 : "--")}</TableCell>
                            <TableCell>{(d.q2 ? d.q2 : "--")}</TableCell>
                            <TableCell>{(d.q3 ? d.q3 : "--")}</TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
            </div>
            
        )
    }
}

export default QualifyingViewer