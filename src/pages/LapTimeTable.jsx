import React, {useEffect, useState} from 'react';
import {DropdownButton, Dropdown, Row, Col, Spinner, Container,} from 'react-bootstrap';

function LapTimeTable({lapTimes, setLapTimes}) {
  const [loading, setLoading] = useState(true);
  const [init, setInit] = useState(false);

  function handleClassSelection(trackClass) {
    // setState({ loading: true })
    // console.log(trackClass);
    setLapTimes((lt) => ({
      ...lt,
      selectedClass: trackClass,
      trackTimes: lt.initialTrackTimes.filter((tt) => tt.class === trackClass && tt.track === lt.selectedTrack),
    }));
  }

  function handleTrackSelection(track) {
    // setState({ loading: true })
    setLapTimes((lt) => ({
      ...lt,
      selectedTrack: track,
      trackTimes: lt.initialTrackTimes.filter((tt) => tt.track === track && tt.class === lt.selectedClass),
    }));

    // console.log(lapTimes);
  }

  useEffect(() => {
    // handleClassSelection(lapTimes.selectedClass);
    // handleTrackSelection(lapTimes.selectedTrack);

    setLapTimes((lt) => {
      return {
        ...lt,
        selectedTrack: 'BBD Breeze',
        trackTimes: lt.initialTrackTimes.filter((tt) => tt.track === lt.selectedTrack && tt.class === lt.selectedClass),
      };
    });
  }, []);

  useEffect(() => {
    console.log('false');

    if (!init) {
      setInit(true);
    } else {
      setLoading(false);
    }
  }, [lapTimes]);

  return (
    <Container>
      {/* <h1> */}
      {/* NoPixel WL Lap Times */}
      {/* </h1> */}
      <Row>
        <Col>
          <Row>
            <Col md={{span: 1, offset: 0}} style={{
              display: "flex",
              alignItems: "center",
              fontSize: "20px"
            }}>
              <span>Track:</span>
            </Col>
            <Col md={{span: 3, offset: 0}}>
              <DropdownButton id="dropdown-class-track" title={lapTimes.selectedTrack.toString()}>
                {
                  [...new Set(lapTimes.initialTrackTimes.map((tt) => tt.track))].filter((e) => e).sort().map((track, i) => (
                    <Dropdown.Item
                      key={`track${i}`}
                      style={{fontSize: '12px', maxHeight: '20px'}}
                      onClick={() => handleTrackSelection(track)}>
                      {track}
                    </Dropdown.Item>
                  ))
                }
              </DropdownButton>
            </Col>
            <Col md={{span: 1, offset: 0}} style={{
              display: "flex",
              alignItems: "center",
              fontSize: "20px"
            }}>
              <span>Class:</span>
            </Col>
            <Col md={{span: 3, offset: 0}}>
              <DropdownButton id="dropdown-class-class" title={lapTimes.selectedClass.toString()}>
                {
                  [...new Set(lapTimes.initialTrackTimes.map((tt) => tt.class))]
                    .filter((e) => e)
                    .sort()
                    .map((trackClass, i) => <Dropdown.Item key={`class${i}`} onClick={() => handleClassSelection(trackClass)}>{trackClass}</Dropdown.Item>)
                }
              </DropdownButton>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        {
          loading
            ? <Spinner style={{marginTop: '50px'}} animation="border"> Loading... </Spinner>
            : (
              <table>
                <tbody>
                <tr>
                  {/* <th>Track</th> */}
                  {/* <th>Class</th> */}
                  <th>Rank</th>
                  <th>Alias</th>
                  <th>Vehicle</th>
                  <th>Time</th>
                  <th>Stream</th>
                </tr>

                {
                  lapTimes.trackTimes.map((tt, i) => (
                    <tr key={i}>
                      {/* <td>{tt.track}</td> */}
                      {/* <td>{tt.class}</td> */}
                      <td>{tt.rank}</td>
                      <td>{tt.alias}</td>
                      <td>{tt.vehicle}</td>
                      <td>{tt.time}</td>
                      <td>{tt.link ? <a href={tt.link}>{tt.linkname}</a> : <span>N/A</span>}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            )
        }
      </Row>

    </Container>
  );
}

export default LapTimeTable;
