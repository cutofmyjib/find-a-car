import React, {Component} from 'react'
import { Router, browserHistory } from 'react-router'
import $ from 'jquery'
import Header from './header.js'
import FormContainer from './formcontainer.js'
import Loading from './loading.js'
import APIError from './api-error.js'
import SystemError from './system-error.js'
import WarningWrapper from './warning-wrapper.js'
import Empty from './empty.js'
import CarWrapper from './car-wrapper.js'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { status: 'loading' };
  }

  loadResults() {
    this.setState({ status: 'loading' })

    // var base = 'https://api.hotwire.com/v1/search/car'
    // hotwire stopped supporting CORS
    // use https://github.com/danasilver/hotwire for CORS wrapper
    var base = 'https://hotwire.herokuapp.com/v1/search/car'
    var api = '83thkexwq5fzm59pt7kgj35y'

    $.ajax({
      url: base,
      dataType: 'json',
      crossDomain: true,
      data: {
        dest: this.props.location.query.city,
        startdate: this.props.location.query.startdate,
        enddate: this.props.location.query.enddate,
        pickuptime: this.props.location.query.pickuptime,
        dropofftime: this.props.location.query.dropofftime,
        format: 'json',
        apikey: api
      },
      success: function(data) {
        this.setState({ data: data, status: 'success' });
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ status: 'error' })
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

  getComponent(state) {
    switch (state.status) {
      case 'loading':
        return <Loading />
      case 'error':
        return <APIError />
      case 'success':
        switch (state.data.StatusCode) {
          case '2':
            return <SystemError message={state.data.StatusDesc} />
          case '3':
            return <WarningWrapper error={state.data.Errors} />
          case '100':
            return <Empty message={state.data.StatusDesc} />
          default:
            return <CarWrapper results={state.data.Result} {...this.props.location.query} />
        }
    }
  }

  render() {
    var component = this.getComponent(this.state);
    return (
      <div>
        <Header />
        <FormContainer isHome={false} {...this.props.location.query} />
        {component}
      </div>
    );
  }
}
