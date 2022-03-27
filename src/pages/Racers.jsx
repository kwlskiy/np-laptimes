import React, {useEffect, useState} from 'react';
import {AiFillCaretDown, AiFillCaretUp, AiOutlineInfoCircle} from 'react-icons/ai';
import {OverlayTrigger, Popover, Row, Tooltip} from 'react-bootstrap';

function Racers({lapTimes}) {
  const [racers, setRacers] = useState({
    racerPositions: [],
    mode: 'Racer', // can be "Racer" or "Alias"
    sortByPos: '1',
    sortByPosDir: 'desc',
    sortByTotal: true
  });

  useEffect(() => {
    // calc who has most LRs
    const racerPositions = [];
    //console.log(lapTimes.initialTrackTimes);

    const sanitizedLapTimes = lapTimes.initialTrackTimes.filter((tt) => tt.alias).map((lt) => {
      if (lt.linkname === '#N/A') {
        // console.log("mapping to " + lt.alias);
        lt.linkname = lt.alias;
      }
      return lt;
    });

    const dedupedLapTimes = [];

    for (const lt of sanitizedLapTimes) {
      const foundI = dedupedLapTimes.findIndex((dlt) => dlt.track === lt.track && dlt.linkname === lt.linkname && dlt.class === lt.class);
      if (foundI !== -1 && dedupedLapTimes[foundI].rank > lt.rank) {
        dedupedLapTimes[foundI] = lt;
      } else if (foundI === -1) {
        dedupedLapTimes.push(lt);
      }
    }
    //console.log(dedupedLapTimes.filter((tt) => tt.linkname === 'Sarah_Digitally'));

    for (const lrTime of dedupedLapTimes) {
      // console.log(lrTime)
      const lrFoundIndex = racerPositions.findIndex((lr) => lr.linkname === lrTime.linkname);
      if (lrFoundIndex === -1) {
        const newEntry = {
          linkname: lrTime.linkname,
          link: lrTime.link,
          aliases: [lrTime.alias],
        };
        let totalAmount = 0;
        for (let i = 1; i <= 10; i++) {
          newEntry[`amount${i}`] = dedupedLapTimes.filter((lr) => lr.linkname === lrTime.linkname && lr.rank === i.toString()).length;
          totalAmount += newEntry[`amount${i}`];
        }
        newEntry.totalAmount = totalAmount;
        racerPositions.push(newEntry);
      } else if (!racerPositions[lrFoundIndex].aliases.includes(lrTime.alias)) {
        // lrTimes[lrFoundIndex].amount++;
        racerPositions[lrFoundIndex].aliases.push(lrTime.alias);
      }
    }

    //console.log(racers.sortByPosDir);
    // console.log(racerPositions);
    let sortedPos;

    if (!racers.sortByTotal) {
      sortedPos = racerPositions.sort((a, b) => (racers.sortByPosDir === 'desc'
        ? b[`amount${racers.sortByPos}`] - a[`amount${racers.sortByPos}`]
        : a[`amount${racers.sortByPos}`] - b[`amount${racers.sortByPos}`]));
    } else {
      sortedPos = racerPositions.sort((a, b) => (racers.sortByPosDir === 'desc' ? b.totalAmount - a.totalAmount : a.totalAmount - b.totalAmount));
    }


    setRacers({...racers, racerPositions: sortedPos});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lapTimes.initialTrackTimes, racers.sortByPos, racers.sortByPosDir, racers.sortByTotal]);

  function handleNumberSort(nr) {
    setRacers((rcrs) => ({
      ...rcrs,
      sortByPos: nr,
      sortByPosDir: rcrs.sortByPosDir === 'asc' ? 'desc' : 'asc',
      sortByTotal: false,
    }));
  }

  function handleTotalSort() {
    setRacers((rcrs) => ({
      ...rcrs,
      sortByPosDir: rcrs.sortByPosDir === 'asc' ? 'desc' : 'asc',
      sortByTotal: true,
    }));
  }

  return (
    <>
      <Row>
        <h2>
          Racers Leaderboard Placements<span> </span>
          <OverlayTrigger
            key={'rTT'}
            placement="bottom"
            overlay={
             <Popover id={`popover-positioned-1`}>
                <Popover.Header as="h2">
                  Top10 Placements
                </Popover.Header>
                <Popover.Body>
                  <span>Amount of placements in the top10 per track.</span>
                  <br/><br/>
                  <span>If there is more than one alias recorded per track, the better time will be taken.</span>
                  <br/><br/>
                  <span>At the moment deleted tracks will be taken into account.</span>
                </Popover.Body>
              </Popover>
            }>
            <span><AiOutlineInfoCircle/></span>
          </OverlayTrigger>
        </h2>

      </Row>

      <table border="1" frame="void" rules="rows">
        <tr>
          {/* <th>Rank</th> */}
          <th>{racers.mode}</th>
          {[...new Array(10)].map((el, i) => {
            return (
              <th
                className={`racerTh ${racers.sortByPos === (i + 1).toString() && !racers.sortByTotal ? 'racerThActive' : ''}`}
                onClick={() => handleNumberSort((i + 1).toString())}>
                #
                {i + 1}
                {' '}
                {racers.sortByPos === (i + 1).toString() && !racers.sortByTotal && (racers.sortByPosDir === 'desc' ? <AiFillCaretDown/> : <AiFillCaretUp/>)}
              </th>
            );
          })}
          <th
            className={`racerTh ${racers.sortByTotal ? 'racerThActive' : ''}`}
            onClick={() => handleTotalSort()}>
            Total
            {racers.sortByTotal && (racers.sortByPosDir === 'desc' ? <AiFillCaretDown/> : <AiFillCaretUp/>)}
          </th>
        </tr>
        {
          racers.racerPositions.slice(0, 100).map((tt, i) => (
            <tr key={i}>
              {/* <td>{tt.track}</td> */}
              {/* <td>{tt.class}</td> */}
              {/* <td>{i + 1}</td> */}
              {/* <td>{tt.linkname}</td> */}
              <td>
                {
                  tt.link
                    ? <>
                      <OverlayTrigger
                        key={'leftTT' + i}
                        placement="left"
                        overlay={
                          <Tooltip id={`tooltip-leftTT${i}`}>
                            <span>Used Aliases:</span><br/>
                            {tt.aliases.map((al) => <><strong>{al}</strong><br/></>)}
                          </Tooltip>
                        }>
                        <span><AiOutlineInfoCircle/></span>
                      </OverlayTrigger>
                      <span>  </span>
                      <a href={tt.link}>{tt.linkname}</a>
                    </>
                    : <span>{tt.linkname}</span>
                }
              </td>
              {[...new Array(10)].map((el, index) => <td>{tt[`amount${index + 1}`]}</td>)}
              <td>{tt.totalAmount}</td>
              {/* <td>{tt.amount1}</td> */}
              {/* <td>{tt.time}</td> */}
              {/* <td>{tt.time.link ? <a href={tt.time.link}>{tt.time.linkname}</a> : <span>N/A</span>}</td> */}
            </tr>
          ))
        }
      </table>
    </>
  );
}

export default Racers;
