import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUserData } from "../../containers/user/store/actions";

//get cookie from server
class AuthRoute extends Component{

    componentWillMount(){
        this.props.getUserData()
    }
    render(){
        return (null)
    }
}

const mapStateToProps = state => ({
    user:state.user
})

const actionCreators = { getUserData }

export default connect(mapStateToProps,actionCreators)(AuthRoute)