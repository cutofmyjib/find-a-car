import React, {Component} from 'react'

export default class Empty extends Component {
  render() {
    return (
      <div className="status-div">
        <div className="ui green message">
          <div className="header">
            {this.props.message}
          </div>
        </div>
      </div>
    )
  }
}