import { Button } from '@nextui-org/react'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/react";

const SeasonTable = (props) => {
    /*props = props.seasonData, props.fetchQualifyingData(fn, req's raceId),
    props.resultsHandler(), props.standingsHandler()
    */
    return (
        // <div class="table-wrapper"> <IN SEASON VIEWER
        <Table aria-label="season table" className='overflow-y-scroll' isHeaderSticky removeWrapper isCompact>
            <TableHeader>
                <TableColumn>Rnd.</TableColumn>
                <TableColumn>Circuit</TableColumn>
                <TableColumn></TableColumn>
                <TableColumn></TableColumn>
            </TableHeader>
            <TableBody id="season-race-Table" >
                {props.seasonData.map((d, indx) =>
                    <TableRow key={indx} value={d.raceId}>
                        <TableCell >{d.round}</TableCell>
                        <TableCell>{d.name}</TableCell>
                        <TableCell>
                            <Button color={"primary"} onClick={props.resultsHandler} value={d.raceId}>Results</Button>
                        </TableCell>
                        <TableCell>
                            <Button color={"primary"} onClick={props.standingsHandler} value={d.raceId}>Standings</Button>
                        </TableCell>
                    </TableRow>)}
            </TableBody>
        </Table>

    )
}

export default SeasonTable