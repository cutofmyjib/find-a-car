import React, {Component} from 'react'
import { Router, browserHistory } from 'react-router'
import $ from 'jquery'
import Header from './header.js'
import FormContainer from './formcontainer.js'
import CityForm from './cityform.js'
import Car from './car.js'
import Warning from './warning.js'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadResults() {
    this.setState({ status: 'loading' })

    var base = 'http://api.hotwire.com/v1/search/car'
    var api = '83thkexwq5fzm59pt7kgj35y'

    $.ajax({
      url: base,
      dataType: 'jsonp',
      crossDomain: true,
      data: {
        dest: this.props.location.query.city,
        startdate: this.props.location.query.startdate,
        enddate: this.props.location.query.enddate,
        pickuptime: this.props.location.query.pickuptime,
        dropofftime: this.props.location.query.dropofftime,
        format: 'jsonp',
        apikey: api
      },
      success: function(data) {
        this.setState({ data: data, status: 'success' });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('hotwire endpoint', status, err.toString())
      }.bind(this)
    })
  }

  componentDidMount() {
    this.loadResults()
  }

  componentDidUpdate(prevProps) {
    var city = this.props.location.query.city,
        startdate = this.props.location.query.startdate,
        enddate = this.props.location.query.enddate,
        pickuptime = this.props.location.query.pickuptime,
        dropofftime = this.props.location.query.dropofftime;
    if (city !== prevProps.location.query.city
      || startdate !== prevProps.location.query.startdate
      || enddate !== prevProps.location.query.enddate
      || pickuptime !== prevProps.location.query.pickuptime
      || dropofftime !== prevProps.location.query.dropofftime) {

      this.loadResults()
    }
  }

  render() {
    if (this.state.status === 'success') {
      if (this.state.data.StatusDesc !== "success") {
        var errors = this.state.data.Errors
        if (errors.length > 1) {
          var errorsArr = errors.map(function(message){
            return <Warning {...message} />
          })
          return (
            <div>
              <Header />
              <FormContainer isHome={false} {...this.props.location.query} />
              <div className="warning">
                {errorsArr}
              </div>
            </div>
          )
        }
        return (
          <div>
            <Header />
            <FormContainer isHome={false} {...this.props.location.query} />
            <div className="warning">
              <Warning ErrorMessage={this.state.data.Errors.Error.ErrorMessage} />
            </div>
          </div>
        )
      }
      var resultsArr = this.state.data.Result
      var results = resultsArr.map(function(data){
        return <Car {...data} />
      })
    } else if (this.state.status === 'loading') {
      return (
        <div>
          <Header />
          <FormContainer isHome={false} {...this.props.location.query} />
          <div className="status-div">
            <div className="ui active inverted dimmer">
              <div className="ui large text loader">Loading</div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Header />
        <FormContainer isHome={false} {...this.props.location.query} />
        <div className="status-div">
          <div className="ui green message">
            <p>Here are your search results for {this.props.location.query.city}, pick up day {this.props.location.query.startdate} at {this.props.location.query.pickuptime} and drop off date {this.props.location.query.enddate} at {this.props.location.query.dropofftime} </p>
          </div>
        </div>
        <div className="ui link cards gut">
          {results}
        </div>
      </div>
    );
  }
}
