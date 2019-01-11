import React, {Component} from 'react';
import axios from 'axios'
class Register extends Component {
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.state = {
            username: '',
            password: '',
            confirmed_password: '',
            role: '',
            gender: '',
            address: '',
            email: '',
            linkedin: '',
            birthday: '',
            phone:'',
            errorMsg: ''
        }
    }
    register(){
        const username = this.state.username
        const password = this.state.password
        const role = this.state.role
        const gender = this.state.gender
        const address = this.state.address
        const email = this.state.email
        const birthday = this.state.birthday
        const phone = this.state.phone


        // this.props.userCreate({username, password, role, gender, address, email, linkedin, birthday, phone})
        axios.post('http://localhost:1337/api/users/register', {username, password, role, gender, address, email, birthday, phone})
            .then(res=>{
                if (res.status == 200) {
                    //success
                    console.log(res.data);
                    alert('crete user successful')
                } else {
                    //error
                    console.log(this.props)
                }
            }).catch(e=>{
            console.log('req error')
            console.log(e)
        })
        console.log('finish')


    }
    handleChange(key, e) {
        console.log(key, e.target.value)
        this.setState({
            [key]: e.target.value
        })

    }
    render() {
        return (
            <div>
                <div className='container' style={{width:'70%',marginTop:'100px'}}>
                    <div className='row justify-content-between'>
                        <div className='col-4'>
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={v=>this.handleChange('username',v)} placeholder="Nick" required/>
                        </div>
                        <div className='col-4'>
                            <label>Role</label>
                            <select className="custom-select" onChange={v=>this.handleChange('role',v)} required>
                                <option value="">Choose...</option>
                                <option value="User">User</option>
                                <option value="shop_owner">Shop owner</option>
                            </select>
                        </div>
                    </div>
                    <div className='row justify-content-between'>
                        <div className='col-4'>
                            <label>Date of birth</label>
                            <input type="date" className="form-control" onChange={v=>this.handleChange('birthday',v)} required/>
                        </div>
                        <div className='col-4'>
                            <label>Gender</label>
                            <select className="custom-select" onChange={v=>this.handleChange('gender',v)} required>
                                <option value="">Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Femal</option>
                            </select>
                        </div>
                    </div>
                    <div className='row justify-content-between'>
                        <div className='col-4'>
                            <label>Password</label>
                            <input type="password" className="form-control" onChange={v=>this.handleChange('password',v)}required/>
                        </div>
                        <div className='col-4'>
                            <label>Confirm password</label>
                            <input type="password" className="form-control" onChange={v=>this.handleChange('confirmed_password',v)}required/>
                        </div>
                    </div>
                    <div className='row justify-content-between align-users-end'>
                        <div className='col-4'>
                            <label>Email address</label>
                            <input type="text" className="form-control" onChange={v=>this.handleChange('email',v)}placeholder="user@gmail.com" required/>
                        </div>
                        <div className="col-4">
                            <label>Address</label>
                            <input type="text" className="form-control" onChange={v=>this.handleChange('address',v)}placeholder="Sydney..." required/>
                        </div>
                    </div>
                    <div className='row justify-content-between align-users-end'>
                        <div className="col-4">
                            <label>Phone</label>
                            <input type="text" className="form-control" onChange={v=>this.handleChange('phone',v)}placeholder="0414999999" required/>
                        </div>
                    </div>
                    <div className='row justify-content-center mt-5'>
                        <button className='btn btn-success w-50' style={{backgroundColor:'#5c7c92', borderRadius:'15px'}} onClick={this.register}>Create</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;