const ConstructorStandings = (props) => {
    //props = constructorStandingsData
    return (
        <div>
            <h4>Constructors</h4>
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
                    {props.constructorStandingsData.map((d, indx) =>
                        <tr key={indx}>
                            <th>{d.position}</th>
                            <th>{d.constructor.name}</th>
                            <th>{d.points}</th>
                            <th>{d.wins}</th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ConstructorStandings