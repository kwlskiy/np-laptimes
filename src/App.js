import React, {Component} from 'react';
// import logo from "./logo.svg"
import './App.css';
import {DropdownButton, Dropdown, Row, Col, Spinner, Container, Table} from 'react-bootstrap';

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      initialTrackTimes: [],
      trackTimes: [],
      lrAmounts: [],
      selectedClass: 'S',
      selectedTrack: 'BBD Breeze'
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    fetch('/.netlify/functions/laptimes')
      .then(response => response.json())
      .then(json => this.setState({loading: false, initialTrackTimes: json}))
      .then(() => this.handleClassSelection(this.state.selectedClass))
      .then(() => this.handleTrackSelection(this.state.selectedTrack))
      .then(() => {
        //calc who has most LRs
        const lrTimes = [];

        for (const lrTime of this.state.initialTrackTimes.filter((tt) => tt.rank === '1')) {
          const lrFoundIndex = lrTimes.findIndex(lr => lr.time.alias === lrTime.alias);
          if (lrFoundIndex === -1) {
            lrTimes.push({
              time: lrTime,
              amount: 1,
            });
          } else {
            lrTimes[lrFoundIndex].amount++;
          }
        }
        this.setState({lrAmounts: lrTimes.filter(el => el.time.alias).sort((a, b) => b.amount - a.amount)});
        //calc who has most Top10 appearances
      });

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
          <Container> <span>Loading Lap Times... </span><Spinner animation={'border'}/></Container>
          :
          <>
            <h1>
              NoPixel WL Lap Times
            </h1>
            <Row>
              <Col>
                Track:
              </Col>
              <Col>
                <DropdownButton id="dropdown-class-track" title={this.state.selectedTrack.toString()}>
                  {
                    [...new Set(this.state.initialTrackTimes.map(tt => tt.track))].filter(e => e).sort().map((track, i) =>
                      <Dropdown.Item key={'track' + i} style={{fontSize: '12px', maxHeight: '20px'}} onClick={e => this.handleTrackSelection(track)}>{track}</Dropdown.Item>
                    )
                  }
                </DropdownButton>
              </Col>
              <Col>
                Class:
              </Col>
              <Col>
                <DropdownButton id="dropdown-class-class" title={this.state.selectedClass.toString()}>
                  {
                    [...new Set(this.state.initialTrackTimes.map(tt => tt.class))].filter(e => e).sort().map((trackClass, i) =>
                      <Dropdown.Item key={'class' + i} onClick={e => this.handleClassSelection(trackClass)}>{trackClass}</Dropdown.Item>
                    )
                  }
                </DropdownButton>
              </Col>
            </Row>
              <table>
                <thead>
                <tr>
                  {/*<th>Track</th>*/}
                  {/*<th>Class</th>*/}
                  <th>Rank</th>
                  <th>Alias</th>
                  <th>Vehicle</th>
                  <th>Time</th>
                  <th>Stream</th>
                </tr>
                </thead>
                <tbody>
                {
                  this.state.trackTimes.map((tt, i) =>
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
            {/*		this.state.lrAmounts.slice(0, 10).map((tt, i) =>*/}
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
            <Row style={{marginTop: '30px', minWidth: '300px'}}>
              <Col>
                <Row style={{fontSize: '12px'}}>Data upkeep by</Row>
                {['DTalmer', 'Benjo411', 'Wuyah404', 'Sarah_Digitally', 'theVirtual', 'kwlski01'].map(p => <Row style={{fontSize: '10px'}}>- {p}</Row>)}
              </Col>
              <Col>
                <p style={{fontSize: '12px'}}>Remarks</p>
                <p style={{fontSize: '10px'}}>This data is put in manually, and may contain errors</p>
                <p style={{fontSize: '10px'}}>Only A and S class times for now</p>
                <p style={{fontSize: '10px'}}>To submit corrections and/or new data, contact one of the data maintainers</p>
                <p style={{fontSize: '10px'}}>To submit feedback for the website or additions, please contact kwlski#5010 in Discord</p>
              </Col>
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
      <div className="App App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <LambdaDemo/>
      </div>
    );
  }
}

export default App;
