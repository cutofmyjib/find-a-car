import React, {Component} from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div className="status-div">
        <div className="ui active inverted dimmer">
          <div className="ui large text loader">Loading</div>
        </div>
      </div>
    )
  }
}