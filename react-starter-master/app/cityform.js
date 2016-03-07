import React, {Component} from 'react';

export default class CityForm extends Component {
  constructor(props) {
    super(props)
    this.state = { city: '' }
  }

  getString(e) {
    var cityStr = e.target.value;
    this.setState({ city: cityStr })
  }

  render() {
    console.log(this.state.city)
    return (
      <div>
        <form className="ui form">
          <div className="field">
            <input type="text" name="city" placeholder="San Francisco" onChange={this.getString.bind(this)}/>
          </div>
        </form>
      </div>
    );
  }
}