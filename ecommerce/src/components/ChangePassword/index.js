import React, {Component} from 'react';
import {connect} from 'react-redux';

class Index extends Component {
    render() {
        return (
            <div>
                <div className='p-4'>
                    <div className='font-weight-bold'>Change password</div>
                    <hr/>
                    <div className="row pl-3">
                        <div className="col-2 p-0">
                            <label htmlFor="">Current password:</label>
                        </div>
                        <div className='col-3'><input type="text"/></div>
                    </div>
                    <div className="row pl-3">
                        <div className="col-2 p-0">
                            <label htmlFor="">New password:</label>
                        </div>
                        <div className='col-3'><input type="text"/></div>
                    </div>
                    <div className="row pl-3">
                        <div className="col-2 p-0">
                            <label htmlFor="">Confirm password:</label>
                        </div>
                        <div className='col-3'><input type="text"/></div>
                    </div>
                    <button className='btn btn-outline-info mt-3 p-0 pl-2 pr-2'>Submit</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Index);
