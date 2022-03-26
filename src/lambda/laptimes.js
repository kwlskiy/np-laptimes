// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311
// https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}

import axios from "axios"
export async function handler(event, context) {
  try {
    // console.log(process.env.NETLIF_GS_KEY)
    const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.NETLIF_GS_ID}?ranges=Lap+Times!B3:H1200&includeGridData=true&key=${process.env.NETLIF_GS_KEY}`, { headers: { Accept: "application/json" } })
    //const data = response.data
    console.log("fetching laptimes...");
    const trackTimes = [];
    // console.log(process.env.NETLIF_GS_KEY);
    // console.log(response.data?.sheets?.[0]?.data?.[0]?.rowData);
    //print each row
    response.data?.sheets?.[0]?.data?.[0]?.rowData.forEach(e => {
      //console.log(e.values?.[6]?.hyperlink);
      trackTimes.push({
        track: e.values?.[0]?.formattedValue,
        class: e.values?.[1]?.formattedValue,
        rank: e.values?.[2]?.formattedValue,
        alias: e.values?.[3]?.formattedValue,
        vehicle: e.values?.[4]?.formattedValue,
        time: e.values?.[5]?.formattedValue,
        linkname: e.values?.[6]?.formattedValue,
        link: e.values?.[6]?.hyperlink,
      })
    });

    //first row obj
    //console.log(response.data?.sheets?.[0]?.data?.[0]?.rowData?.[0].values);
    //first cell first row/col
    //console.log(response.data?.sheets?.[0]?.data?.[0]?.rowData?.[0].values?.[0]?.formattedValue);
    //console.log(trackTimes?.[3]);
    return {
      statusCode: 200,
      body: JSON.stringify(trackTimes)
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
