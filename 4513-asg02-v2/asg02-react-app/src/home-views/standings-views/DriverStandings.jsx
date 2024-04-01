const DriverStandings = (props) => {
    //props = props.driverStandingsData,
    return (
        <div>
            <h4>Drivers</h4>
            <table>
                <thead>
                    <tr>
                        <th>Pos.</th>
                        <th>Name</th>
                        <th>Pts.</th>
                        <th>Wins</th>
                    </tr>
                </thead>
                <tbody>
                    {props.driverStandingsData.map((d, indx) =>
                        <tr key={indx}>
                            <th>{d.position}</th>
                            <th>{d.driver.forename} {d.driver.surname}</th>
                            <th>{d.points}</th>
                            <th>{d.wins}</th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DriverStandings
