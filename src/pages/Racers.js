import React, {Component, useEffect, useState} from 'react';
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai';
import {DropdownButton, Dropdown, Row, Col, Spinner, Container, Nav} from 'react-bootstrap';



function Racers({lapTimes}) {

	const [racers, setRacers] = useState({
		racerPositions: [],
		mode: "Racer", // can be "Racer" or "Alias"
		sortByPos: "1",
		sortByPosDir: "desc",
	});

	useEffect(() => {
		//calc who has most LRs
		const racerPositions = [];
		console.log(lapTimes.initialTrackTimes)

		const sanitizedLapTimes = lapTimes.initialTrackTimes.filter((tt) => tt.alias).map(lt => {
			if(lt.linkname === "#N/A"){
				//console.log("mapping to " + lt.alias);
				lt.linkname = lt.alias;
			}
			return lt;
		});


		const dedupedLapTimes = [];

		for(const lt of sanitizedLapTimes){
			const foundI = dedupedLapTimes.findIndex(dlt => dlt.track === lt.track && dlt.linkname === lt.linkname && dlt.class === lt.class);
			if(foundI !== -1 && dedupedLapTimes[foundI].rank > lt.rank){
				dedupedLapTimes[foundI] = lt;
			} else if(foundI === -1) {
				dedupedLapTimes.push(lt);
			}
		}
		console.log(dedupedLapTimes.filter(tt => tt.linkname === "Sarah_Digitally"));


		for (const lrTime of dedupedLapTimes) {
			//console.log(lrTime)
			const lrFoundIndex = racerPositions.findIndex(lr => lr.linkname === lrTime.linkname);
			if (lrFoundIndex === -1) {

				const newEntry = {
					linkname: lrTime.linkname,
				}
				let totalAmount = 0;
				for(let i = 1; i <= 10; i++){
					newEntry[`amount${i}`] = dedupedLapTimes.filter(lr => lr.linkname === lrTime.linkname && lr.rank === i.toString()).length;
					totalAmount += newEntry[`amount${i}`];
				}
				newEntry.totalAmount = totalAmount;
				racerPositions.push(newEntry);
			} else {
				//lrTimes[lrFoundIndex].amount++;
			}
		}

		console.log(racers.sortByPosDir);
		//console.log(racerPositions);
		const sortedPos = racerPositions.sort((a, b) => racers.sortByPosDir === "desc"
			? b[`amount${racers.sortByPos}`] - a[`amount${racers.sortByPos}`]
			: a[`amount${racers.sortByPos}`] - b[`amount${racers.sortByPos}`]);

		setRacers({...racers, racerPositions: sortedPos});
	}, [lapTimes.initialTrackTimes, racers.sortByPos, racers.sortByPosDir]);

	function handleNumberSort(nr) {
		setRacers((rcrs) => ({
			...rcrs,
			sortByPos: nr,
			sortByPosDir: rcrs.sortByPosDir === "asc" ? "desc" : "asc"
		}))
	}

	return (
		<>
			<h2>
				Racers Leaderboard Placements
			</h2>

			{/*<h2>*/}
			{/*	Amount of Lap Records per Alias*/}
			{/*</h2>*/}
			<table>
				<tr>
					{/*<th>Rank</th>*/}
					<th>{racers.mode}</th>
					{[...new Array(10)].map((el, i) => {
						return (
							<th className={"racerTh " + (racers.sortByPos === (i + 1).toString() ? "racerThActive" : "")}
								onClick={() => handleNumberSort((i + 1).toString())}>
								#{i + 1} {
									racers.sortByPos === (i + 1).toString()
										&& (racers.sortByPosDir === "desc" ? <AiFillCaretDown/> : <AiFillCaretUp/>)
								}
							</th>
						);
					})}
					<th>Total</th>
				</tr>

				{
					racers.racerPositions.slice(0, 100).map((tt, i) =>
						<tr key={i}>
							{/*<td>{tt.track}</td>*/}
							{/*<td>{tt.class}</td>*/}
							{/*<td>{i + 1}</td>*/}
							<td>{tt.linkname}</td>
							{[...new Array(10)].map((el, i) => <td>{tt[`amount${i + 1}`]}</td>)}
							<td>{tt.totalAmount}</td>
							{/*<td>{tt.amount1}</td>*/}
							{/*<td>{tt.time}</td>*/}
							{/*<td>{tt.time.link ? <a href={tt.time.link}>{tt.time.linkname}</a> : <span>N/A</span>}</td>*/}
						</tr>)
				}
			</table>
		</>
	);
}

export default Racers;
