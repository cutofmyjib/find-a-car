import React, {Component} from 'react'

export default class Warning extends Component {
  render() {
    return (
      <div>
        <div className="ui purple message">
          <div className="header">
            {this.props.ErrorMessage}
          </div>
        </div>
      </div>
    )
  }
}