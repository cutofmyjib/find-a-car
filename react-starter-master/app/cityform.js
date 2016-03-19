import React, {Component} from 'react';

export default class CityForm extends Component {
  render() {
    return (
      <div className="field">
        <label>City</label>
        <input type="text" name="city" value={this.props.city} placeholder="San Francisco" onChange={this.props.onChange} />
      </div>
    );
  }
}

