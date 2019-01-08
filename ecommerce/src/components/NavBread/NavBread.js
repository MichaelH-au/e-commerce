import React, {Component} from 'react';

class NavBread extends Component {
    render() {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Products</li>
                    </ol>
                </nav>
            </div>
        );
    }
}

export default NavBread;