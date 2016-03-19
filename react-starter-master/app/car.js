import React, {Component} from 'react'

export default class Car extends Component {
  getImgSrc(code) {
    var base = 'https://ak-secure.hotwirestatic.com/y/static/images/car/cartypes/289x137/US/';
    switch (code) {
      case 'ECAR':
        return { type: 'Economy car', url: base + 'econ.png' }
      case 'CCAR':
        return { type: 'Compact car', url: base + 'compact.png' }
      case 'FCAR':
        return { type: 'Full-size car', url: base + 'FullSize.png' }
      case 'FFAR' || 'FRAR':
        return { type: 'Full-size SUV', url: base + 'FullSize_SUV.png' }
      case 'ICAR':
        return { type: 'Mid-size car', url: base + 'Midsize.png' }
      case 'IFAR':
        return { type: 'Mid-size SUV', url: base + 'Midsize_SUV.png' }
      case 'LCAR':
        return { type: 'Luxury car', url: base + 'Luxury.png' }
      case 'MVAR':
        return { type: 'Minivan', url: base + 'Minivan.png' }
      case 'PCAR':
        return { type: 'Premium car', url: base + 'Premium.png' }
      case 'SCAR':
        return { type: 'Standard car', url: base + 'Standard.png' }
      case 'SFAR':
        return { type: 'Standard SUV', url: base + 'Standard_SUV_correct.png' }
      case 'SPAR':
        return { type: 'Standard Pickup truck', url: base + 'Pickup.png' }
      case 'STAR':
        return { type: 'Convertible car', url: base + 'Convertible.png' }
      default:
        return { type: 'Mini, Wagon or Special car', url: base + 'Special.png' }
    }
  }

  render() {
    return (
      <div className="ui card">
          <div className="image">
            <img src={this.getImgSrc(this.props.CarTypeCode).url} />
          </div>
          <div className="content">
            <a className="header">{this.getImgSrc(this.props.CarTypeCode).type}</a>
            <div className="meta">Mileage description: {this.props.MileageDescription}</div>
            <div className="description">Location description: <br/>{this.props.LocationDescription}</div>
          </div>
          <div className="extra content">
            <i className="dollar icon"></i>
            {this.props.DailyRate} per day
          </div>
        </div>
    );
  }
}