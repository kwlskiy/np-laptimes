import React, {Component, useEffect, useState} from 'react';
import {DropdownButton, Dropdown, Row, Col, Spinner, Container, Nav} from 'react-bootstrap';


function LapTimeTable({lapTimes, setLapTimes}) {

	const [loading, setLoading] = useState(true);
	const [init, setInit] = useState(false);

	function handleClassSelection(trackClass) {
		//setState({ loading: true })
		//console.log(trackClass);
		setLapTimes((lt) => ({
			...lt,
			selectedClass: trackClass,
			trackTimes: lt.initialTrackTimes.filter(tt => tt.class === trackClass && tt.track === lt.selectedTrack)
		}));
	}

	function handleTrackSelection(track) {
		//setState({ loading: true })
		setLapTimes((lt) => ({
			...lt,
			selectedTrack: track,
			trackTimes: lt.initialTrackTimes.filter(tt => tt.track === track && tt.class === lt.selectedClass)
		}));

		//console.log(lapTimes);
	}

	useEffect(() => {
		// handleClassSelection(lapTimes.selectedClass);
		// handleTrackSelection(lapTimes.selectedTrack);

		setLapTimes((lt) => {

			return {
				...lt,
				selectedTrack: "BBD Breeze",
				trackTimes: lt.initialTrackTimes.filter(tt => tt.track === lt.selectedTrack && tt.class === lt.selectedClass)
			}
		});
		// setLapTimes((lt) => ({
		// 	...lt,
		// 	loading: false
		// }))


		//setLoading(false);
		//setLoading(false);
	}, []);

	useEffect(() => {
		console.log("false")

		if(!init){
			setInit(true);
		} else {
			setLoading(false);
		}

	}, [lapTimes])


	return (
		<>
			{/*<h1>*/}
			{/*	NoPixel WL Lap Times*/}
			{/*</h1>*/}
			<Row>
				<Col>
					Track:
				</Col>
				<Col>
					<DropdownButton id="dropdown-class-track" title={lapTimes.selectedTrack.toString()}>
						{
							[...new Set(lapTimes.initialTrackTimes.map(tt => tt.track))].filter(e => e).sort().map((track, i) =>
								<Dropdown.Item key={'track' + i} style={{fontSize: '12px', maxHeight: '20px'}}
											   onClick={e => handleTrackSelection(track)}>{track}</Dropdown.Item>
							)
						}
					</DropdownButton>
				</Col>
				<Col>
					Class:
				</Col>
				<Col>
					<DropdownButton id="dropdown-class-class" title={lapTimes.selectedClass.toString()}>
						{
							[...new Set(lapTimes.initialTrackTimes.map(tt => tt.class))].filter(e => e).sort().map((trackClass, i) =>
								<Dropdown.Item key={'class' + i} onClick={e => handleClassSelection(trackClass)}>{trackClass}</Dropdown.Item>
							)
						}
					</DropdownButton>
				</Col>
			</Row>

			{
				loading
					? <Spinner style={{marginTop: "50px"}} animation={'border'}> Loading... </Spinner>
					: <table>
						<tbody>
						<tr>
							{/*<th>Track</th>*/}
							{/*<th>Class</th>*/}
							<th>Rank</th>
							<th>Alias</th>
							<th>Vehicle</th>
							<th>Time</th>
							<th>Twitch</th>
						</tr>

						{
							lapTimes.trackTimes.map((tt, i) =>
								<tr key={i}>
									{/*<td>{tt.track}</td>*/}
									{/*<td>{tt.class}</td>*/}
									<td>{tt.rank}</td>
									<td>{tt.alias}</td>
									<td>{tt.vehicle}</td>
									<td>{tt.time}</td>
									<td>{tt.link ? <a href={tt.link}>{tt.linkname}</a> : <span>N/A</span>}</td>
								</tr>)
						}
						</tbody>
					</table>
			}

			{/*<h2>*/}
			{/*	Amount of Lap Records per Alias*/}
			{/*</h2>*/}
			{/*<table>*/}
			{/*	<tr>*/}
			{/*		/!*<th>Track</th>*!/*/}
			{/*		/!*<th>Class</th>*!/*/}
			{/*		<th>Rank</th>*/}
			{/*		<th>Alias</th>*/}
			{/*		<th>Amount</th>*/}
			{/*		/!*<th>Time</th>*!/*/}
			{/*		<th>Twitch</th>*/}
			{/*	</tr>*/}

			{/*	{*/}
			{/*		lapTimes.racerPositions.slice(0, 10).map((tt, i) =>*/}
			{/*			<tr key={i}>*/}
			{/*				/!*<td>{tt.track}</td>*!/*/}
			{/*				/!*<td>{tt.class}</td>*!/*/}
			{/*				<td>{i + 1}</td>*/}
			{/*				<td>{tt.time.alias}</td>*/}
			{/*				<td>{tt.amount}</td>*/}
			{/*				/!*<td>{tt.time}</td>*!/*/}
			{/*				<td>{tt.time.link ? <a href={tt.time.link}>{tt.time.linkname}</a> : <span>N/A</span>}</td>*/}
			{/*			</tr>)*/}
			{/*	}*/}
			{/*</table>*/}
			{/*<Row style={{marginTop: '30px', minWidth: '500px'}}>*/}
			{/*	<Col>*/}
			{/*		<Row style={{fontSize: '12px'}}>Data upkeep by</Row>*/}
			{/*		{['DTalmer', 'Benjo411', 'Wuyah404', 'Sarah_Digitally', 'theVirtual', 'kwlski01'].map(p => <Row style={{fontSize: '10px'}}>- {p}</Row>)}*/}
			{/*	</Col>*/}
			{/*	<Col>*/}
			{/*		<p style={{fontSize: '12px'}}>Remarks</p>*/}
			{/*		<p style={{fontSize: '10px'}}>This data is put in manually, and may contain errors</p>*/}
			{/*		<p style={{fontSize: '10px'}}>Only A and S class times for now</p>*/}
			{/*		<p style={{fontSize: '10px'}}>To submit corrections and/or new data, contact one of the data maintainers</p>*/}
			{/*		<p style={{fontSize: '10px'}}>To submit feedback for the website or additions, please contact kwlski#5010 in Discord</p>*/}
			{/*	</Col>*/}
			{/*</Row>*/}
		</>
	);
}

export default LapTimeTable;
