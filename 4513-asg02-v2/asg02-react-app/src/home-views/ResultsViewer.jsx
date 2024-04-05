import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/react";
const ResultsViewer = (props) => {
    //props: resultsData={props.resultsData} showDriver={showDriver} idForDriverModal={idForDriverModal}, 
    //.. idForConstructorModal, showConstructor()
    if (props.resultsData.length > 0) {
        //^ protects against a bug where, when null (i.e. on login/startup), props.resultsData[0].driver prevents the whole page from loading 

        if (props.resultsData.length == 0) {
            return (
                <p id="no-results-p">No results found for this race.</p>
            )
        }
        else {
            return (
                <div id="results-viewer">
                    <div id="results-top-three">
                        <div className="top-three bg-yellow-300">
                            <h4>1st</h4>
                            <a className="clickable bg-stone-100" onClick={
                                () => props.showDriver(props.resultsData[0].driver.driverId)
                            } data={props.resultsData[0].driver.driverId}>
                                {props.resultsData[0].driver.forename + " " + props.resultsData[0].driver.surname}

                            </a>
                        </div>
                        <div className="top-three bg-stone-400">
                            <h4>2nd</h4>
                            <a className="clickable bg-stone-100" onClick={
                                () => props.showDriver(props.resultsData[1].driver.driverId)
                            } data={props.resultsData[1].driver.driverId}>
                                {props.resultsData[1].driver.forename + " " + props.resultsData[1].driver.surname}
                            </a>
                        </div>
                        <div className="top-three bg-yellow-700">
                            <h4>3rd</h4>
                            <a className="clickable bg-stone-100" onClick={
                                () => props.showDriver(props.resultsData[2].driver.driverId)
                            } data={props.resultsData[2].driver.driverId}>
                                {props.resultsData[2].driver.forename + " " + props.resultsData[2].driver.surname}
                            </a>
                        </div>
                    </div>
                    <div id="results-table" className="table-wrapper" >
                        <Table aria-label="results table" isHeaderSticky removeWrapper> 
                            <TableHeader>
                                <TableColumn>Pos.</TableColumn>
                                <TableColumn>Racer</TableColumn>
                                <TableColumn>Constructor</TableColumn>
                                <TableColumn>Laps</TableColumn>
                                <TableColumn>Points</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {props.resultsData.map((d, indx) =>
                                    <TableRow key={indx}>
                                        <TableCell>{d.position}</TableCell>
                                        <TableCell>
                                            <a className="clickable" onClick={
                                                () => props.showDriver(d.driver.driverId)
                                            }>{d.driver.forename + " " + d.driver.surname}</a>
                                        </TableCell>
                                        <TableCell>
                                            <a className="clickable" onClick={
                                                () => props.showConstructor(d.constructor.constructorId)
                                            }>{d.constructor.name}</a>
                                        </TableCell>
                                        <TableCell>{d.laps}</TableCell>
                                        <TableCell>{d.points}</TableCell>
                                        {/* (d.q1 ? d.q1 : "N/A") */}

                                    </TableRow>)}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )
        }

    }

}

export default ResultsViewer