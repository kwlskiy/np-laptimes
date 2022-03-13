import React from 'react';
import {Row, Col} from 'react-bootstrap';

function About() {
  return (
    <>
      {/*<h1>*/}
      {/*  About*/}
      {/*</h1>*/}

      <Col>
        <Row style={{fontSize: '28px', marginTop: '30px', }}>
          Remarks
        </Row>
        <Row style={{fontSize: '18px'}}>
          - This data is put in manually, and may contain errors
        </Row>
        <Row style={{fontSize: '18px'}}>
          - Only A and S class times for now
        </Row>
        <Row style={{fontSize: '18px'}}>
          - To submit corrections and/or new data, contact one of the data maintainers
        </Row>
        <Row style={{fontSize: '18px'}}>
          - To submit feedback for the website or additions, please contact kwlski#5010 in Discord
        </Row>
        <Row style={{fontSize: '28px', marginTop: '30px', }}/>
        <Row style={{fontSize: '28px', marginBottom: '10px'}}>Data upkeep by</Row>
        {['DTalmer', 'Benjo411', 'Wuyah404', 'Sarah_Digitally', 'theVirtual', 'kwlski01'].map((p) => (
          <Row style={{fontSize: '20px'}}>
            {p}
          </Row>
        ))}
      </Col>

    </>
  );
}

export default About;
