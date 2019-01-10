import React, {Component} from 'react';
import './header.css'
class Header extends Component {
    render() {
        return (
            <div>
                <div className="row align-items-center navBar m-0" >
                    <div className="col-1 mainIcon text-center">
                        Home
                    </div>
                    <div className='col-11 text-right'>
                        <div className='login mr-5'>Login</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;