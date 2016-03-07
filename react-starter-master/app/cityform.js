import React, {Component} from 'react';

export default class CityForm extends Component {
  render() {
    return (
      <div>
        <form className="ui form">
          <div className="field">
            <input type="text" name="city" placeholder="San Francisco" onChange={this.props.onChange} />
          </div>
        </form>
      </div>
    );
  }
}