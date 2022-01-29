import React, {Component} from 'react'

export default class Loader extends Component {
    render() {
        return (

            <div className='pt-5'>
                <h4>{this.props.message}</h4>
            </div>
        )
    }
}