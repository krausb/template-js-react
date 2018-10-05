import React from 'react';
import ReactDOM from 'react-dom';
import ReactUploadFile from 'react-upload-file';
import Button from 'react-bootstrap/lib/Button';
import queryString from 'query-string';

/**
  * Part Component: File Input dialog
  *
  * The dialog part is added and rendered uppon onClick of "Add file" button
  */
class FileInputDialog extends React.Component {

  state = {
    fileDialogId: this.props.fileDialogId
  }

  remove = () => {
    var thisNode = document.getElementById('file-input-' + this.props.fileDialogId)
    thisNode.parentElement.removeChild(thisNode);
  }

  render () {
    return (
        <div className="file-input" ref={'file-input-' + this.props.fileDialogId} key={'file-input-' + this.props.fileDialogId} id={'file-input-' + this.props.fileDialogId}>
           <input type="file" name="file-input"/>
           <button type="button" style={{float: 'left'}} onClick={() => this.remove()}>remove</button>
           <div style={{clear:'both'}}></div>
        </div>
    )
  }

}

/**
  * Upload Dialog
  *
  * The dialog enables uploading data onto raw data store. If no specific
  * sessionId is set, the API creates a new sessionId and results that uppon
  * Upload Request Result.
  *
  * Properties:
  * @param apiUrl     React param
  * @param sessionId  GET param
  */
class UploadDialog extends React.Component {

  state = {
    apiUrl: this.props.apiUrl,
    files: []
  }

  componentDidMount () {
    if(this.props.location.search) {
      let params = queryString.parse(this.props.location.search)
      console.log("queryParam", queryString.parse(this.props.location.search))
      if(params.sessionId) {
        this.setState({sessionId: params.sessionId})
      }
    }

    console.log("props", this.props)
    this.addFile()
  }

  /**
    * Add and render a new FileInputDialog
    */
  addFile = () => {
    let newFileId = this.state.files.length
    const newFile = <div key={newFileId}><FileInputDialog fileDialogId={newFileId} /></div>

    let files = this.state.files;
    files.push(newFile);
    this.setState({files: files})
    ReactDOM.render(<div>{this.state.files}</div>, document.getElementById('upload-files'));
  }

  /**
    * Raw Data Store API Access:
    * Upload the list of files. The responsed results are rendered as
    * status message into the dialog.
    *
    * Request:
    * -> PUT <API_URL>/data/
    * Request Params:
    * -> SessionID: X-Requested-With Header Param
    * Request Body:
    * -> Files to Upload
    * Expected response:
    * -> application/json - ResponseStatusList
    */
  submitFiles = () => {
    var form = document.querySelector('form')

    var uploadForm = new FormData(form)

    fetch(this.state.apiUrl + '/data/', {
      method: 'PUT',
      headers: (this.state.sessionId ? {"X-Requested-With": this.state.sessionId } : {}),
      body: uploadForm
    })
    .then(result => {
      return result.json();
    })
    .then(resultData => {
        this.setState({sessionId: resultData.sessionId})
        let uploadStatus = resultData.uploadStatus.map((status) => {
          return(
            <div key={status.fileName} style={(status.statusCode == 200 ? this.uploadOkStyle() : this.uploadFailedStyle())}>
              File: {status.data.fileName} - Status: {status.status}
            </div>
          )
        })
        ReactDOM.render(<div>{uploadStatus}</div>, document.getElementById('upload-status'));
        ReactDOM.render(<span>{this.state.sessionId}</span>, document.getElementById('session-id'))
      })
  }

  /**
    * OK Status Message Style
    */
  uploadOkStyle = () => {
    return({
      fontWeight: 'bold',
      color: 'green'
    })
  }

  /**
    * FAILED Status Message Style
    */
  uploadFailedStyle = () => {
    return({
      fontWeight: 'bold',
      color: 'red'
    })
  }

  /**
    * Render UploadDialog
    */
  render () {
    let sessionIdHint = <p><b>SessionID: <span id="session-id">{(this.state.sessionId ? this.state.sessionId : '.. new ..')}</span></b></p>

    return(
      <div>
        <h1>Upload Media Data</h1>
        <button type="button" onClick={() => this.addFile() }> <span>Add file</span> </button><br/><br/>
        <form id="upload" method="PUT" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
          {sessionIdHint}
          <div id="upload-files">
          </div>
          <div id="upload-status">
          </div>
          <button type="button" onClick={() => this.submitFiles()}>Upload</button>
        </form>
      </div>
    )
  }

}

export default UploadDialog
