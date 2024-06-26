import DriverStandings from './DriverStandings'
import ConstructorStandings from './ConstructorStandings'

const StandingsViewer = (props) => {
    /*props: driverStandingsData={props.driverStandingsData}
    showDriver={showDriver} idForDriverModal={idForDriverModal}
    constructorStandingsData={props.constructorStandingsData} 
    showConstructor={showConstructor} idForConstructorModal={idForConstructorModal}
    */
    console.log(props.driverStandingsData)
    if (props.driverStandingsData.length == 0) {
        return (<p>Loading...</p>)
    }
    return (
        <div id="standings-viewer">
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
                        <p>(This may be due to gaps in the database)</p>
                    </div>
                }
                {props.constructorStandingsData.length > 0 ?
                    //IF DATA EXISTS, RETURN:
                    <div>
                        <ConstructorStandings constructorStandingsData={props.constructorStandingsData} showConstructor={props.showConstructor} />
                    </div>
                    : //IF NO DATA, RETURN:
                    <div>
                        <p id="no-constructorStandings-p">No constructor standings data found for this race.</p>
                        <p>(This may be due to gaps in the database)</p>
                    </div>
                }
            </div>
        </div>

    )
}

export default StandingsViewer