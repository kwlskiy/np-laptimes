import React, {Component, useEffect, useState} from 'react';
import {DropdownButton, Dropdown, Row, Col, Spinner, Container, Nav} from 'react-bootstrap';


function About({lapTimes}) {


	return (
		<>
			<h1>
				About
			</h1>
			<Row style={{marginTop: '30px', minWidth: '500px'}}>
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
	);
}

export default About;
