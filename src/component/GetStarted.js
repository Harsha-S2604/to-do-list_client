import React, {Component} from 'react';
import Api from "../helper/api";
import Loader from './Loader';

export default class GetStarted extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            email: "",
            errorMsg: "",
            api: new Api()
        }
        
    }
    handleChange = (event) => {
        const {name, value} = event.target
        switch(name) {
            case "email":
                this.setState({
                    email: value,
                    errorMsg: ""
                })
        }
    }

    handleAddUser = async () => {
        await this.props.changeLoading(true)
        const data = {
            "email": this.state.email
        }

        this.state.api.addNewUser(data)
        .then(async (response) => {
            if(response.data.success) {
                await this.props.changeLoading(false)
                await this.props.cookies.set("todo_userid", response.data.id)
                await this.props.cookies.set("todo_email", this.state.email)
            } else {
                await this.props.changeLoading(false)
                this.setState({
                    errorMsg: response.data.message
                })
            }
        }).catch(async (err) => {
            await this.props.changeLoading(false)
            this.setState({
                errorMsg: "Sorry, Something went wrong please try again later."
            })
        })

        

    }
    render() {
        const isDisabled = !(this.state.email)
        return (
            <div style={{paddingTop: "80px"}}>
                <h3>Please enter your email to continue!</h3>
                <div>
                    <div className="pt-5">
                        <input placeholder="Enter your email here" 
                            className="todo__input" 
                            type="email"
                            name="email"
                            id="email"
                            onChange={this.handleChange}
                            value={this.state.email}/>
                    </div>
                    {
                        this.props.isLoading ? 
                        <Loader message="Please wait..."/> : 
                        <div className='pt-5'>
                            <button className='btn-outline-light btn' onClick={this.handleAddUser} disabled={isDisabled}>Continue</button>
                        </div>
                    }

                    {
                        this.state.errorMsg ? 
                        <h5 className='text-danger pt-5'>{this.state.errorMsg}</h5> : null
                    }
                </div>
            </div>
        )
    }
}