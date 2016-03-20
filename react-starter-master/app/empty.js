import React, {Component} from 'react'

export default class Empty extends Component {
  render() {
    return (
      <div className="status-div">
        <div className="ui green message">
          {this.props.message}
        </div>
      </div>
    )
  }
}