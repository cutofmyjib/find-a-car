import React, {Component} from 'react'
import Warning from './warning.js'

export default class WarningWrapper extends Component {
  render() {
    var error = this.props.error;

    //hotwire api, Errors given as an array or object,
    //the object Errors looks like this Errors = { Error: {...}, ... }
    var errors = (Array.isArray(error)) ? error : [error.Error]

    var errorList = errors.map(function(message){
      return <Warning message={message.ErrorMessage} />
    })

    return (
      <div className="status-div">
        {errorList}
      </div>
    )
  }
}
