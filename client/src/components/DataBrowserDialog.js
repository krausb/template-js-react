import React from 'react';
import ReactDOM from 'react-dom';
import ReactUploadFile from 'react-upload-file';
import { withRouter } from 'react-router-dom'

/**
  * Data Browser Dialog
  *
  * The dialog enables a read only view to uploaded media data through
  * UploadDialog
  *
  * Properties:
  * @param apiUrl
  */
class DataBrowserDialog extends React.Component {

  state = {
    sessionFiles: [],
    sessions: [],
    apiUrl: this.props.apiUrl
  }

  componentDidMount() {
    this.fetchSessions()
  }

  /**
    * Data API Access:
    * Fetch all media sessions
    *
    * Request:
    * -> GET <API_URL>/data/media/all
    * Expected response:
    * -> application/json - PagedSessionList
    */
  fetchSessions = () => {
    fetch(this.state.apiUrl + '/data/media/all')
    .then(result => {
      return result.json();
    }).then(this.renderSessions)
  }

  /**
    * Render received PagedSessionList
    */
  renderSessions = (data) => {
    let sessions = data.sessions.map((sessionId) => {
      const filesIdAttribute    = { ["id"]: 'files-' + sessionId }
      const sessionIdAttribute  = { ["id"]: 'session-' + sessionId }
      return (
        <div className="data-session" key={sessionId} {... sessionIdAttribute}>
          <h4>Session ID: {sessionId}</h4>
          <button type="button" onClick={() => this.fetchFilesFromSession(sessionId)}>Load files</button>
          <button type="button" onClick={() => this.uploadFilesToSession(sessionId)}>Upload files</button>
          <button type="button" onClick={() => this.deleteSession(sessionId)}>Delete session</button>
          <div {... filesIdAttribute}></div>
        </div>
      )
    })
    this.setState({sessions: sessions})
    console.log("state", this.state.sessions)
  }

  /**
    * Navigate to UploadDialog with sessionId as parameter
    */
  uploadFilesToSession = (sessionId) => {
    console.log("upload files", sessionId)
    this.props.history.push( '/upload?sessionId=' + sessionId )
  }

  /**
    * Data API Access:
    * Delete a whole session
    *
    * Request:
    * -> DELETE <API_URL>/data/media/<sessionId>
    * Expected response:
    * -> statusCode
    */
  deleteSession = (sessionId) => {
    console.log("delete session", sessionId)
    fetch(this.state.apiUrl + '/data/media/' + sessionId, {
      method: 'DELETE'
    })
    .then(result => {
      console.log("delete response", result)
      if(result.status == 200) {
        var sessionNode = document.getElementById('session-' + sessionId)
        sessionNode.parentElement.removeChild(sessionNode);
        alert('Session with ID ' + sessionId + ' successfully deleted.')
      } else {
        alert('Session with ID ' + sessionId + ' cannot be deleted.')
      }
    })
  }

  /**
    * Data API Access:
    * Fetch files for a specific session
    *
    * Request:
    * -> GET <API_URL>/data/<sessionId>/files
    * Expected response:
    * -> application/json - PagedDataFileList
    */
  fetchFilesFromSession = (sessionId) => {
    console.log("fetch files for sessionId", sessionId)
    fetch(this.state.apiUrl + '/data/'+ sessionId + '/files')
    .then(result => {
      return result.json();
    }).then(data => this.renderFilesFromSession(sessionId, data))
  }

  /**
    * Render received PagedDataFileList
    */
  renderFilesFromSession = (sessionId, data) => {
    console.log("render files for sessionId", sessionId, data)
    let files = data.entities.map((entity) => {
      const fileIdAttribute    = { ["id"]: 'file-' + sessionId + '-' + entity.fileName}
      return (
        <tr key={entity.fileName} {... fileIdAttribute}>
          <td><a href={ this.state.apiUrl + '/data/' + sessionId + '/files/' + entity.fileName } target="_blank">{entity.fileName}</a></td>
          <td>{entity.contentType}</td>
          <td>{new Date(entity.uploadedAt).toISOString()}</td>
          <td>{entity.size}</td>
          <td><button type="button" onClick={() => this.deleteFile(sessionId, entity.fileName)}>Delete</button></td>
        </tr>
      )
    })
    console.log("files for session " + sessionId, files)

    const table = <table id="data-session-files-{sessionId}">
                    <tbody>
                      <tr>
                        <th>File name</th>
                        <th>Content type</th>
                        <th>Uploaded at</th>
                        <th>Size in bytes</th>
                        <th>Actions</th>
                      </tr>
                      {files}
                    </tbody>
                  </table>;
    ReactDOM.render(table, document.getElementById('files-' + sessionId));
  }

  /**
    * Raw Data Store API Access:
    * Delete a file from sessionId
    *
    * Request:
    * -> DELETE <API_URL>/data/<sessionId>/files/<fileName>
    * Expected response:
    * -> statusCode
    */
  deleteFile = (sessionId, fileName) => {
    console.log("delete session", sessionId)
    fetch(this.state.apiUrl + '/data/' + sessionId + '/files/' + fileName, {
      method: 'DELETE'
    })
    .then(result => {
      console.log("delete response", result)
      if(result.status == 200) {
        var fileNode = document.getElementById('file-' + sessionId + '-' + fileName)
        fileNode.parentElement.removeChild(fileNode);
        alert('File ' + fileName + ' successfully deleted from session with ID ' + sessionId + '.')
      } else {
        alert('File ' + fileName + ' from session with ID ' + sessionId + ' could not be deleted.')
      }
    })
  }

  /**
    * Render MediaDataBrowserDialog
    */
  render() {
    return(
    <div>
      <h1>Media Data Browser</h1>
      <button type="button" onClick={ this.fetchSessions }> <span>Reload files</span> </button><br/><br/>
      <h2>Available sessions</h2>
      <div id="session-table">
        {this.state.sessions}
      </div>
    </div>
    )
  }

}

export default DataBrowserDialog
