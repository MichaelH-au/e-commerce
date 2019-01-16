import React, {Component} from 'react';
import {connect} from 'react-redux';

class ErrorMsg extends Component {
    render() {
        return (
            <div>
                <div className='errorBox fontSizeSmall'><img className='errorIcon' src={require('../../images/util/Invalid.png')} alt=""/>{this.props.data}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user:state.user
    };
}

export default connect(
    mapStateToProps,
)(ErrorMsg);
