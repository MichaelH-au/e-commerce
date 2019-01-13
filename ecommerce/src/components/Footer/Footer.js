import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <div className='container-fluid p-5 mt-5' style={{backgroundColor:'lightgrey'}}>
                <div className="row justify-content-center fontSizeSmall">
                    <div className="col-2">
                        <h6>Information</h6>
                        <div>About Us</div>
                        <div>FAQ</div>
                        <div>Order history</div>
                        <div>Order information</div>
                    </div>
                    <div className="col-2">
                        <h6>Customer Service</h6>
                        <div>Contact Us</div>
                        <div>Returns</div>
                        <div>Site Map</div>
                        <div>My Account</div>
                    </div>
                    <div className="col-2">
                        <h6>My Account</h6>
                        <div>Brands</div>
                        <div>Gift Vouchers</div>
                        <div>Affiliates</div>
                        <div>Specials</div>
                    </div>
                    <div className="col-2">
                        <h6>My Account</h6>
                        <div>UNSW Sydnye</div>
                        <div>Email: huangjkau@gmail.com</div>
                        <div>PhoneL: 0414978548</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;