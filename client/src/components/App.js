import React from 'react'
import Header from './Header'
import Main from './Main'

/**
  * Main Application and Root Object for Web UI
  *
  * Properties:
  * @param apiUrl Base URL of the Web UI API
  */
class App extends React.Component {

  state = {
    apiUrl: this.props.apiUrl
  }

  render () {
    return (
      <div>
        <Header />
        <Main apiUrl={this.state.apiUrl}/>
      </div>
    )
  }
}

export default App
