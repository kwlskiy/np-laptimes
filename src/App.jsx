import React, {useEffect, useState} from 'react';
// import logo from "./logo.svg"
import './App.css';
import {Spinner, Container, Nav,} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
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
    setLapTimes({...lapTimes, loading: true});

    fetch('/.netlify/functions/laptimes')
      .then((response) => response.json())
      .then((json) => setLapTimes((lt) => ({...lt, initialTrackTimes: json})))
      .then(() => {
        setLapTimes((lt) => ({
          ...lt,
          loading: false,
          trackTimes: lt.initialTrackTimes.filter((tt) => tt.class === lapTimes.selectedClass && tt.track === lt.selectedTrack),
        }));
      })


      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleNav(eventKey) {
    console.log(eventKey);
  }

  return (
    <>
      {lapTimes.loading
        ? (
          <Container fluid className="App-header" style={{display: 'flex', justifyContent: "center", alignItems: "center", height: "100%"}}>
            {' '}
            <span>Loading Lap Times... </span>
            <Spinner animation="border"/>
          </Container>
        )
        : (
          <>
            <Nav className="navHeader" variant="pills" activeKey="1" onSelect={handleNav}>
              <Nav.Item>
                <Nav.Link as={Link} to="/">
                  <span className="navHeader">NoPixel WL Lap Times</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{marginLeft: '50px'}} className={'navBtn'}>
                <Nav.Link className="navHeader" as={Link} to="/">
                  Lap Times
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={'navBtn'}>
                <Nav.Link className="navHeader" title="Item" as={Link} to="/racers">
                  Racers
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="navHeader" as={Link} to="/about">
                  About
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Container className="main-content" md={{ span: 6, offset: 3 }} style={{ padding: "20px"}}>
              <Routes>
                <Route
                  path="/"
                  element={(
                    <LapTimeTable
                      lapTimes={lapTimes}
                      setLapTimes={setLapTimes}/>
                  )}/>
                <Route
                  path="/racers"
                  element={(
                    <Racers
                      lapTimes={lapTimes}
                      setLapTimes={setLapTimes}/>
                  )}/>
                <Route path="/about" element={<About/>}/>
              </Routes>
            </Container>
          </>
        )}
    </>
  );
}

function App() {
  return (
    <Router>
        <LapTimes/>
    </Router>
  );
}

export default App;
