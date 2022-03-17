import React, { useEffect, useState } from 'react';
// import logo from "./logo.svg"
import './App.css';
import { Spinner, Container, Nav } from 'react-bootstrap';
import { BrowserRouter as Router,
  Route,
  Routes,
  Link } from 'react-router-dom';
import Racers from './pages/Racers.jsx';
import About from './pages/About.jsx';
import LapTimeTable from './pages/LapTimeTable.jsx';

function LapTimes() {
  const [lapTimes, setLapTimes] = useState({
    loading: true,
    initialTrackTimes: [],
    trackTimes: [],
    lrAmounts: [],
    selectedClass: 'S',
    selectedTrack: 'BBD Breeze',
  });

  useEffect(() => {
    console.log('RUN');
    setLapTimes({ ...lapTimes, loading: true });

    // setTimeout(() => setLapTimes({...lapTimes, loading: false}), 1000);

    fetch('/.netlify/functions/laptimes')
      .then((response) => response.json())
      .then((json) => setLapTimes((lt) => ({ ...lt, initialTrackTimes: json })))
      .then(() => {
        setLapTimes((lt) => ({
          ...lt,
          loading: false,
          trackTimes: lt.initialTrackTimes.filter((tt) => tt.class === lapTimes.selectedClass && tt.track === lt.selectedTrack),
        }));
      })

    // .then(() => {
    // 	//calc who has most LRs
    // 	const lrTimes = [];
    //
    // 	for (const lrTime of lapTimes.initialTrackTimes.filter((tt) => tt.rank === '1')) {
    // 		const lrFoundIndex = lrTimes.findIndex(lr => lr.time.alias === lrTime.alias);
    // 		if (lrFoundIndex === -1) {
    // 			lrTimes.push({
    // 				time: lrTime,
    // 				amount: 1,
    // 			});
    // 		} else {
    // 			lrTimes[lrFoundIndex].amount++;
    // 		}
    // 	}
    // 	setLapTimes({...lapTimes, racerPositions: lrTimes.filter(el => el.time.alias).sort((a, b) => b.amount - a.amount)});
    // 	//calc who has most Top10 appearances
    // })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   handleClick = api => e => {
  //   e.preventDefault()
  //
  //   setState({ loading: true })
  //   fetch("/.netlify/functions/" + api)
  //     .then(response => response.json())
  //     .then(json => setState({ loading: false, trackTimes: json }))
  // }

  // handleShow = api => e => {
  // 	e.preventDefault();
  //
  // 	//setState({ loading: true })
  // 	fetch('/.netlify/functions/' + api)
  // 		.then(response => response.json())
  // 		.then(json => setState({loading: false, trackTimes: json}));
  // };

  function handleNav(eventKey) {
    console.log(eventKey);
  }

  return (
    <>
      {lapTimes.loading
        ? (
          <Container className='App-header'>
            {' '}
            <span>Loading Lap Times... </span>
            <Spinner animation='border' />
          </Container>
        )
        :				(
          <>
            <Nav className='navHeader' variant='pills' activeKey='1' onSelect={handleNav}>
              <Nav.Item >
                <Nav.Link as={Link} to='/'>
                  <span className='navHeader'>NoPixel WL Lap Times</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ marginLeft: '50px' }} className={"navBtn"}>
                <Nav.Link className='navHeader' as={Link} to='/'>
                  Lap Times
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={"navBtn"}>
                <Nav.Link className='navHeader' as={Link} to='/racers'>
                  Racers
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={"navBtn"}>
                <Nav.Link className='navHeader' as={Link} to='/about'>
                  About
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <div className='App-header'>
              <Routes>
                <Route
                  path='/'
                  element={(
                    <LapTimeTable
                    lapTimes={lapTimes}
                    setLapTimes={setLapTimes} />
)} />
                <Route
                  path='/racers'
                  element={(
                    <Racers
                    lapTimes={lapTimes}
                    setLapTimes={setLapTimes} />
)} />
                <Route path='/about' element={<About />} />
              </Routes>

            </div>
          </>
        )}
    </>
  );
}

// function LapTimeTable({lapTimes, setLapTimes}) {
// 	function handleClassSelection(trackClass) {
// 		//setState({ loading: true })
// 		//console.log(trackClass);
// 		setLapTimes((lt) => ({
// 			...lt,
// 			selectedClass: trackClass,
// 			trackTimes: lt.initialTrackTimes.filter(tt => tt.class === trackClass && tt.track === lt.selectedTrack)
// 		}));
// 	}
//
// 	function handleTrackSelection(track) {
// 		//setState({ loading: true })
// 		setLapTimes((lt) => ({
// 			...lt,
// 			selectedTrack: track,
// 			trackTimes: lt.initialTrackTimes.filter(tt => tt.track === track && tt.class === lt.selectedClass)
// 		}));
//
// 		console.log(lapTimes);
// 	}
//
// 	useEffect(() => {
// 		handleClassSelection(lapTimes.selectedClass);
// 		handleTrackSelection(lapTimes.selectedTrack);
// 	}, []);
//
//
// 	return (
// 		<>
// 			<h1>
// 				NoPixel WL Lap Times
// 			</h1>
// 			<Row>
// 				<Col>
// 					Track:
// 				</Col>
// 				<Col>
// 					<DropdownButton id="dropdown-class-track" title={lapTimes.selectedTrack.toString()}>
// 						{
// 							[...new Set(lapTimes.initialTrackTimes.map(tt => tt.track))].filter(e => e).sort().map((track, i) =>
// 								<Dropdown.Item key={'track' + i} style={{fontSize: '12px', maxHeight: '20px'}}
// 											   onClick={e => handleTrackSelection(track)}>{track}</Dropdown.Item>
// 							)
// 						}
// 					</DropdownButton>
// 				</Col>
// 				<Col>
// 					Class:
// 				</Col>
// 				<Col>
// 					<DropdownButton id="dropdown-class-class" title={lapTimes.selectedClass.toString()}>
// 						{
// 							[...new Set(lapTimes.initialTrackTimes.map(tt => tt.class))].filter(e => e).sort().map((trackClass, i) =>
// 								<Dropdown.Item key={'class' + i} onClick={e => handleClassSelection(trackClass)}>{trackClass}</Dropdown.Item>
// 							)
// 						}
// 					</DropdownButton>
// 				</Col>
// 			</Row>
// 			<table>
// 				<tbody>
// 				<tr>
// 					{/*<th>Track</th>*/}
// 					{/*<th>Class</th>*/}
// 					<th>Rank</th>
// 					<th>Alias</th>
// 					<th>Vehicle</th>
// 					<th>Time</th>
// 					<th>Twitch</th>
// 				</tr>
//
// 				{
// 					lapTimes.trackTimes.map((tt, i) =>
// 						<tr key={i}>
// 							{/*<td>{tt.track}</td>*/}
// 							{/*<td>{tt.class}</td>*/}
// 							<td>{tt.rank}</td>
// 							<td>{tt.alias}</td>
// 							<td>{tt.vehicle}</td>
// 							<td>{tt.time}</td>
// 							<td>{tt.link ? <a href={tt.link}>{tt.linkname}</a> : <span>N/A</span>}</td>
// 						</tr>)
// 				}
// 				</tbody>
// 			</table>
// 			{/*<h2>*/}
// 			{/*	Amount of Lap Records per Alias*/}
// 			{/*</h2>*/}
// 			{/*<table>*/}
// 			{/*	<tr>*/}
// 			{/*		/!*<th>Track</th>*!/*/}
// 			{/*		/!*<th>Class</th>*!/*/}
// 			{/*		<th>Rank</th>*/}
// 			{/*		<th>Alias</th>*/}
// 			{/*		<th>Amount</th>*/}
// 			{/*		/!*<th>Time</th>*!/*/}
// 			{/*		<th>Twitch</th>*/}
// 			{/*	</tr>*/}
//
// 			{/*	{*/}
// 			{/*		lapTimes.racerPositions.slice(0, 10).map((tt, i) =>*/}
// 			{/*			<tr key={i}>*/}
// 			{/*				/!*<td>{tt.track}</td>*!/*/}
// 			{/*				/!*<td>{tt.class}</td>*!/*/}
// 			{/*				<td>{i + 1}</td>*/}
// 			{/*				<td>{tt.time.alias}</td>*/}
// 			{/*				<td>{tt.amount}</td>*/}
// 			{/*				/!*<td>{tt.time}</td>*!/*/}
// 			{/*				<td>{tt.time.link ? <a href={tt.time.link}>{tt.time.linkname}</a> : <span>N/A</span>}</td>*/}
// 			{/*			</tr>)*/}
// 			{/*	}*/}
// 			{/*</table>*/}
// 			<Row style={{marginTop: '30px', minWidth: '500px'}}>
// 				<Col>
// 					<Row style={{fontSize: '12px'}}>Data upkeep by</Row>
// 					{['DTalmer', 'Benjo411', 'Wuyah404', 'Sarah_Digitally', 'theVirtual', 'kwlski01'].map(p => <Row style={{fontSize: '10px'}}>- {p}</Row>)}
// 				</Col>
// 				<Col>
// 					<p style={{fontSize: '12px'}}>Remarks</p>
// 					<p style={{fontSize: '10px'}}>This data is put in manually, and may contain errors</p>
// 					<p style={{fontSize: '10px'}}>Only A and S class times for now</p>
// 					<p style={{fontSize: '10px'}}>To submit corrections and/or new data, contact one of the data maintainers</p>
// 					<p style={{fontSize: '10px'}}>To submit feedback for the website or additions, please contact kwlski#5010 in Discord</p>
// 				</Col>
// 			</Row>
// 		</>
// 	);
// }

function App() {
  return (
    <Router>
      <div className='App'>
        <header>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <LapTimes />
        </header>
      </div>
    </Router>
  );
}

export default App;
