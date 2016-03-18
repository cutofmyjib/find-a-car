import React, {Component} from 'react'

export default class Car extends Component {
  getImgSrc(code) {
    var base = 'https://ak-secure.hotwirestatic.com/y/static/images/car/cartypes/289x137/US/';
    switch (code) {
      case 'ECAR':
        return base + 'econ.png'
      case 'CCAR':
        return base + 'compact.png'
      case 'FCAR':
        return base + 'FullSize.png'
      case 'FFAR' || 'FRAR':
        return base + 'FullSize_SUV.png'
      case 'ICAR':
        return base + 'Midsize.png'
      case 'IFAR':
        return base + 'Midsize_SUV.png'
      case 'LCAR':
        return base + 'Luxury.png'
      case 'MVAR':
        return base + 'Minivan.png'
      case 'PCAR':
        return base + 'Premium.png'
      case 'SCAR':
        return base + 'Standard.png'
      case 'SFAR':
        return base + 'Standard_SUV_correct.png'
      case 'SPAR':
        return base + 'Pickup.png'
      case 'STAR':
        return base + 'Convertible.png'
      default:
        return base + 'Special.png'
    }
  }

  render() {
    console.log(this.props.CarTypeCode)
    // var imgSrc = this.getImgSrc(this.props.CarTypeCode);
    return (
      <div className="ui card">
          <div className="image">
            <img src={this.getImgSrc(this.props.CarTypeCode)} />
          </div>
          <div className="content">
            <a className="header">{this.props.CarTypeCode}</a>
            <div className="description">{this.props.MileageDescription}</div>
          </div>
          <div className="extra content">
            <i className="dollar icon"></i>
            {this.props.DailyRate}
          </div>
        </div>
    );
  }
}