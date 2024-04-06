import {Table, TableHeader, TableBody, TableColumn, TableRow, TableCell  } from "@nextui-org/react";
const ConstructorStandings = (props) => {
    //props = constructorStandingsData, showConstructor(id)
    console.log(props.constructorStandingsData)
    return (
        <div >
            <h4>Constructors</h4>
            <div className="table-wrapper bg-default">
                <Table aria-label="constructor standings table" removeWrapper isHeaderSticky>
                    <TableHeader>
                            <TableColumn>Pos.</TableColumn>
                            <TableColumn>Name</TableColumn>
                            <TableColumn>Pts.</TableColumn>
                            <TableColumn>Wins</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {props.constructorStandingsData.map((d, indx) =>
                            <TableRow key={indx} className='bg-default'>
                                <TableCell>{d.position}</TableCell>
                                <TableCell>
                                    <a className="clickable" onClick={() => props.showConstructor(d.constructor.constructorId)}>{d.constructor.name}</a>
                                </TableCell>
                                <TableCell>{d.points}</TableCell>
                                <TableCell>{d.wins}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            
        </div>
    )
}

export default ConstructorStandings