import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, trackTimes: [] }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, trackTimes: json }))
  }

  render() {
    const { loading, msg } = this.state

    return (
        <>
          <p>
            {/*<button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>*/}
            <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Load All Times"}</button>
            <br />
          </p>
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
              this.state.trackTimes.map((tt) =>
                  <tr>
                      <td>{tt.track}</td>
                      <td>{tt.class}</td>
                      <td>{tt.rank}</td>
                      <td>{tt.alias}</td>
                      <td>{tt.vehicle}</td>
                      <td>{tt.time}</td>
                      <td>{tt.twitch}</td>
                  </tr>)
            }
          </table>

        </>

    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
