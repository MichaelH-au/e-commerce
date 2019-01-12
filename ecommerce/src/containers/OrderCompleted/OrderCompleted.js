import React, {Component} from 'react';
import {connect} from 'react-redux';

class OrderCompleted extends Component {
    render() {
        console.log(this.props.location.state)
        return (
            <div>
                <h1>complete</h1>
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
)(OrderCompleted);
