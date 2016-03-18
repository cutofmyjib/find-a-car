import React, {Component} from 'react'
import { Router, browserHistory } from 'react-router'
import $ from 'jquery'
import Header from './header.js'
import CityForm from './cityform.js'
import Car from './car.js'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadResults() {
    var base = 'http://api.hotwire.com/v1/search/car';
    var api = '83thkexwq5fzm59pt7kgj35y'

    console.log(this.props.location)

    $.ajax({
      url: base,
      dataType: 'jsonp',
      crossDomain: true,
      data: {
        dest: this.props.location.query.dest,
        startdate: this.props.location.query.startdate,
        enddate: this.props.location.query.enddate,
        pickuptime: this.props.location.query.pickuptime,
        dropofftime: this.props.location.query.dropofftime,
        format: 'jsonp',
        apikey: api
      },
      success: function(data) {
        console.log('success')
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('hotwire endpoint', status, err.toString())
      }.bind(this)
    })
  }

  componentDidMount() {
    this.loadResults()
  }

  render() {
    console.log(this.state.data)
    if (this.state.data) {
      var array = this.state.data.Result
      var results = array.map(function(data){
        return <Car {...data} />
      })
    }
    return (
      <div>
        <Header />
        <div className="ui link cards gut">
          {results}
        </div>
      </div>
    );
  }
}
