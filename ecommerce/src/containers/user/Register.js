import React, {Component} from 'react';
import axios from 'axios'
import './user.css'

class Register extends Component {
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.state = {
            username: '',
            password: '',
            confirmed_password: '',
            role: 'user',
            // gender: '',
            // address: '',
            // email: '',
            // linkedin: '',
            // birthday: '',
            // phone:'',
            errorMsg: ''
        }
    }
    register(){
        const username = this.state.username
        const password = this.state.password
        const role = this.state.role
        // const gender = this.state.gender
        // const address = this.state.address
        // const email = this.state.email
        // const birthday = this.state.birthday
        // const phone = this.state.phone


        // this.props.userCreate({username, password, role, gender, address, email, linkedin, birthday, phone})
        axios.post('/api/users/register', {username, password, role})
            .then(res=>{
                if (res.status === 200) {
                    //success
                    // console.log(res.data);
                    alert('crete user successful')
                } else {
                    //error
                    // console.log(this.props)
                }
            }).catch(e=>{
            // console.log('req error')
            console.log(e)
        })
        // console.log('finish')


    }
    handleChange(key, e) {
        this.setState({
            [key]: e.target.value
        })

    }
    render() {
        return (
            <div className='registerContainer'>
                <div className='container bg-white w-50 mt-5' >
                    <div className='font-weight-bold greyColor'>Create Account</div>
                    <hr/>
                    <div className='registerBox align-items-center text-left w-100 pt-5'>
                        <div className='col-8'>
                            {/*Username:*/}
                            <input type="text" className="form-control" onChange={v=>this.handleChange('username',v)} placeholder="Username" required/>
                        </div>
                    <div className='col-8 mt-3'>
                        {/*Account Type:*/}
                        <select className="custom-select" onChange={v=>this.handleChange('role',v)} required>
                            <option value="user">User</option>
                            <option value="shop_owner">Shop owner</option>
                        </select>
                    </div>
                        {/*<div className='col-8 mt-3'>*/}
                            {/*Date of birth:*/}
                            {/*<input type="date" className="form-control" onChange={v=>this.handleChange('birthday',v)} placeholder='Date of birth' required/>*/}
                        {/*</div>*/}
                        {/*<div className='col-8 mt-3'>*/}
                            {/*<label>Gender:</label>*/}
                            {/*<select className="custom-select" onChange={v=>this.handleChange('gender',v)} required>*/}
                                {/*<option value="">Choose...</option>*/}
                                {/*<option value="Male">Male</option>*/}
                                {/*<option value="Female">Femal</option>*/}
                            {/*</select>*/}
                        {/*</div>*/}
                        <div className='col-8 mt-3'>
                            {/*<label>Password:</label>*/}
                            <input type="password" className="form-control" onChange={v=>this.handleChange('password',v)} placeholder='Password'/>
                        </div>
                        <div className='col-8 mt-3 mb-3'>
                            {/*<label>Confirm password:</label>*/}
                            <input type="password" className="form-control" onChange={v=>this.handleChange('confirmed_password',v)} placeholder='Confirm Password'/>
                        </div>
                        {/*<div className='col-8 mt-3'>*/}
                            {/*<label>Email address:</label>*/}
                            {/*<input type="text" className="form-control" onChange={v=>this.handleChange('email',v)}placeholder="user@gmail.com" required/>*/}
                        {/*</div>*/}
                        {/*<div className="col-8 mt-3">*/}
                            {/*<label>Address:</label>*/}
                            {/*<input type="text" className="form-control" onChange={v=>this.handleChange('address',v)}placeholder="Sydney..." required/>*/}
                        {/*</div>*/}
                        {/*<div className="col-8 mt-3 mb-5">*/}
                            {/*<label>Phone:</label>*/}
                            {/*<input type="text" className="form-control" onChange={v=>this.handleChange('phone',v)}placeholder="0414999999" required/>*/}
                        {/*</div>*/}
                        <button className='btn btn-success col-7 mb-5' onClick={this.register}>Create</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;