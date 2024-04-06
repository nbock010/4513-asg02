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
            const topThree = [props.resultsData[0], props.resultsData[1], props.resultsData[2]]
            const restOfRacers = props.resultsData.slice(3)
            return (
                <div id="results-viewer">
                    <div id="results-table" className="table-wrapper bg-default" >
                        <Table aria-label="results table" isHeaderSticky removeWrapper className="overflow-y-scroll">
                            <TableHeader>
                                <TableColumn>Pos.</TableColumn>
                                <TableColumn>Racer</TableColumn>
                                <TableColumn>Constructor</TableColumn>
                                <TableColumn>Laps</TableColumn>
                                <TableColumn>Points</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {/* TOP THREE (this is hard-coded to allow the top 3 to match the tablerow background colours)*/}
                                <TableRow className="pos-first">
                                    <TableCell>{topThree[0].position}</TableCell>
                                    <TableCell><a className="clickable" onClick={
                                        () => props.showDriver(topThree[0].driver.driverId)
                                    }>{topThree[0].driver.forename + " " + topThree[0].driver.surname}</a></TableCell>
                                    <TableCell><a className="clickable" onClick={
                                        () => props.showConstructor(topThree[0].constructor.constructorId)
                                    }>{topThree[0].constructor.name}</a></TableCell>
                                    <TableCell>{topThree[0].laps}</TableCell>
                                    <TableCell>{topThree[0].points}</TableCell>
                                </TableRow>
                                <TableRow className="pos-second">
                                    <TableCell>{topThree[1].position}</TableCell>
                                    <TableCell><a className="clickable" onClick={
                                        () => props.showDriver(topThree[1].driver.driverId)
                                    }>{topThree[1].driver.forename + " " + topThree[1].driver.surname}</a></TableCell>
                                    <TableCell><a className="clickable" onClick={
                                        () => props.showConstructor(topThree[1].constructor.constructorId)
                                    }>{topThree[1].constructor.name}</a></TableCell>
                                    <TableCell>{topThree[1].laps}</TableCell>
                                    <TableCell>{topThree[1].points}</TableCell>
                                </TableRow>
                                <TableRow className="pos-third">
                                    <TableCell>{topThree[2].position}</TableCell>
                                    <TableCell><a className="clickable" onClick={
                                        () => props.showDriver(topThree[2].driver.driverId)
                                    }>{topThree[2].driver.forename + " " + topThree[2].driver.surname}</a></TableCell>
                                    <TableCell><a className="clickable" onClick={
                                        () => props.showConstructor(topThree[2].constructor.constructorId)
                                    }>{topThree[2].constructor.name}</a></TableCell>
                                    <TableCell>{topThree[2].laps}</TableCell>
                                    <TableCell>{topThree[2].points}</TableCell>
                                </TableRow>
                                {/* OTHER RACERS */}
                                {restOfRacers.map((d, indx) =>
                                    <TableRow key={indx} className='bg-default'>
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