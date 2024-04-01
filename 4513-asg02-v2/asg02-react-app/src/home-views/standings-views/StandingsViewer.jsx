import { useState, useEffect } from 'react'

import DriverStandings from './DriverStandings'
import ConstructorStandings from './ConstructorStandings'

const StandingsViewer = (props) => {
    //props: driverStandingsData={driverStandingsData}, props.showDriver(id), props.idForDriverModal
    return (
        <div id="standings-viewer">
            <h3>Standings</h3>
            <p>For round {props.driverStandingsData.length > 0 ? props.driverStandingsData[0].race.round : "#"}</p>
            <div id="standings-tables">
                {props.driverStandingsData.length > 0 ?
                    //IF DATA EXISTS, RETURN:
                    <div>
                        <DriverStandings driverStandingsData={props.driverStandingsData}
                            showDriver={props.showDriver} idForDriverModal={props.idForDriverModal} />
                    </div>
                    : //IF NO DATA, RETURN:
                    <div>
                        <p id="no-driverStandings-p">No driver standings data found for this race.</p>
                    </div>
                }
                {props.constructorStandingsData.length > 0 ?
                    //IF DATA EXISTS, RETURN:
                    <div>
                        <ConstructorStandings constructorStandingsData={props.constructorStandingsData} />
                    </div>
                    : //IF NO DATA, RETURN:
                    <div>
                        <p id="no-constructorStandings-p">No constructor standings data found for this race.</p>
                    </div>
                }
            </div>
        </div>

    )
}

export default StandingsViewer