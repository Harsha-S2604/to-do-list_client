import React, {Component} from "react";
import { withCookies } from 'react-cookie';
import GetStarted from "./GetStarted";
import { addTask, changeLoading, getTasks, saveTasks } from "../actions/taskConfig";
import { connect } from "react-redux";
import Tasks from './Tasks';


class ToDoList extends Component {



    render() {
        return (
            <div style={{paddingTop: "70px"}}>
                <center>
                    <h1>To-Do List</h1>
                    {
                       !(this.props.cookies.get("todo_userid") && this.props.cookies.get("todo_email")) ?
                        <GetStarted {...this.props}/> : 
                        <Tasks {...this.props}/>
                    }
                </center>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    let { taskConfig } = state;
    return { ...taskConfig }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoading: (isLoading) => dispatch(changeLoading(isLoading)),
        saveTasks: (tasks) => dispatch(saveTasks(tasks))
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(withCookies(ToDoList))