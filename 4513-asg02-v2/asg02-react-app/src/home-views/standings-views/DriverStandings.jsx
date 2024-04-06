import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell  } from "@nextui-org/react";
const DriverStandings = (props) => {
    //props = props.driverStandingsData, props.showDriver(id), props.idForDriverModal
    console.log("driver standings:")
    console.log(props.driverStandingsData)
    return (
        <div className="table-wrapper">
            <h4>Drivers</h4>
            <Table aria-label="driver standings table" removeWrapper isHeaderSticky>
                <TableHeader>
                        <TableColumn>Pos.</TableColumn>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Pts.</TableColumn>
                        <TableColumn>Wins</TableColumn>
                </TableHeader>
                <TableBody>
                    {props.driverStandingsData.map((d, indx) =>
                        <TableRow key={indx} className='bg-default'>
                            <TableCell>{d.position}</TableCell>
                            <TableCell>
                                <a className="clickable" onClick={() => props.showDriver(d.driver.driverId)}>
                                    {d.driver.forename + " " + d.driver.surname}
                                </a>
                            </TableCell>
                            <TableCell>{d.points}</TableCell>
                            <TableCell>{d.wins}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default DriverStandings
