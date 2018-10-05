import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import UploadDialog from './UploadDialog'
import MediaDataBrowserDialog from './MediaDataBrowserDialog'
import MaprawDataBrowserDialog from './MaprawDataBrowserDialog'

/**
  * Main Component
  *
  * A path based Router component is used to build the page structure and enable
  * navigation between the different UIs:
  * - Mapraw Data Browser
  * - Media Data Browser
  * - Upload Dialog
  */
class Main extends React.Component {

  state = {
    sessionFiles: [],
    sessions: [],
    apiUrl: this.props.apiUrl
  }

  render () {
    return(
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/upload' render={(props) => <UploadDialog apiUrl={this.state.apiUrl} {...props}/>}/>
          <Route path='/data' render={(props) => <MediaDataBrowserDialog apiUrl={this.state.apiUrl} key={Date.now()} dialogTitle="Data Browser" {...props}/>}/>
        </Switch>
      </main>
    )
  }
}

export default Main
