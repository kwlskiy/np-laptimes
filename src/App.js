import React, {Component} from 'react';
// import logo from "./logo.svg"
import './App.css';
import {DropdownButton, Dropdown, Row, Col, Spinner} from 'react-bootstrap';

class LambdaDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			initialTrackTimes: [],
			trackTimes: [],
			selectedClass: 'All',
			selectedTrack: 'BBD Breeze'
		};
	}

	componentDidMount() {
		this.setState({loading: true});
		fetch('/.netlify/functions/laptimes')
			.then(response => response.json())
			.then(json => this.setState({loading: false, initialTrackTimes: json}))
			.then(() => this.handleClassSelection(this.state.selectedClass))
			.then(() => this.handleTrackSelection(this.state.selectedTrack));

	}

	//   handleClick = api => e => {
	//   e.preventDefault()
	//
	//   this.setState({ loading: true })
	//   fetch("/.netlify/functions/" + api)
	//     .then(response => response.json())
	//     .then(json => this.setState({ loading: false, trackTimes: json }))
	// }

	// handleShow = api => e => {
	// 	e.preventDefault();
	//
	// 	//this.setState({ loading: true })
	// 	fetch('/.netlify/functions/' + api)
	// 		.then(response => response.json())
	// 		.then(json => this.setState({loading: false, trackTimes: json}));
	// };

	handleClassSelection = trackClass => {
		//this.setState({ loading: true })
		//console.log(trackClass);
		this.setState({
			selectedClass: trackClass,
			trackTimes: this.state.initialTrackTimes.filter(tt => tt.class === trackClass && tt.track === this.state.selectedTrack)
		});
	};

	handleTrackSelection = track => {
		//this.setState({ loading: true })
		this.setState({
			selectedTrack: track,
			trackTimes: this.state.initialTrackTimes.filter(tt => tt.track === track && tt.class === this.state.selectedClass)
		});
	};

	render() {

		return (
			<>
				{this.state.loading ?
					<Spinner animation={'border'}/>
					:
					<>
						<h1>
							NoPixel WL Lap Times
						</h1>
						<Row>
							<Col>
								Class:
							</Col>
							<Col>
								<DropdownButton id="dropdown-class-class" title={this.state.selectedClass.toString()}>
									{
										[...new Set(this.state.initialTrackTimes.map(tt => tt.class))].map((trackClass, i) =>
											<Dropdown.Item key={'class' + i} onClick={e => this.handleClassSelection(trackClass)}>{trackClass}</Dropdown.Item>
										)
									}
								</DropdownButton>
							</Col>

						</Row>
						<Row>
							<Col>
								Track:
							</Col>
							<Col>
								<DropdownButton id="dropdown-class-track" title={this.state.selectedTrack.toString()}>
									{
										[...new Set(this.state.initialTrackTimes.map(tt => tt.track))].map((track, i) =>
											<Dropdown.Item key={'track' + i} onClick={e => this.handleTrackSelection(track)}>{track}</Dropdown.Item>
										)
									}
								</DropdownButton>
							</Col>
						</Row>

						<table>
							<tr>
								<th>Track</th>
								<th>Class</th>
								<th>Rank</th>
								<th>Alias</th>
								<th>Vehicle</th>
								<th>Time</th>
								<th>Twitch</th>
							</tr>

							{
								this.state.trackTimes.map((tt, i) =>
									<tr key={i}>
										<td>{tt.track}</td>
										<td>{tt.class}</td>
										<td>{tt.rank}</td>
										<td>{tt.alias}</td>
										<td>{tt.vehicle}</td>
										<td>{tt.time}</td>
										<td><a href={'https://twitch.com/' + tt.twitch}>{tt.twitch}</a></td>
									</tr>)
							}
						</table>
						<Row style={{marginTop: "30px", minWidth: "500px"}}>
							<Col>
								<Row style={{fontSize: "12px"}}>Data upkeep by</Row>
								{["DTalmer", "Benjo411", "Wuyah404", "Sarah_Digitally", "theVirtual", "kwlski01"].map(p => <Row style={{fontSize: "10px"}}>- {p}</Row>)}
							</Col>
							{/*<Col>*/}
							{/*	<p style={{fontSize: "12px"}}>Website by</p>*/}
							{/*	<p style={{fontSize: "10px"}}>- kwlski</p>*/}
							{/*</Col>*/}
						</Row>
					</>
				}
			</>
		);
	}
}

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					{/*<img src={logo} className="App-logo" alt="logo" />*/}
					<LambdaDemo/>
				</header>
			</div>
		);
	}
}

export default App;
