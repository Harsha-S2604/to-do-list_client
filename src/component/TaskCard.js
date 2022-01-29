import React, {Component} from 'react';
import Api from '../helper/api';

export default class TaskCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            api: new Api(),
            deleteErr: ""
        }
    }
    
    handleCompleted = (taskId) => {
        let formData = new FormData()
        formData.append("isCompleted", true)
        this.state.api.updateTask(taskId, formData)
            .then(async (response) => {
                if(response.data.success) {
                    await this.props.getTasksHandler()
                    this.props.setDeleteErrMsg("")
                } else {
                    this.props.setDeleteErrMsg(response.data.message)
                }
            })
            .catch(async (error) => {
                this.props.setDeleteErrMsg("sorry something went wrong. please try again later.")
            })
    }

    handleRemove = (taskId) => {
        this.state.api.removeTask(taskId)
            .then(async (response) => {
                if(response.data.success) {
                    await this.props.getTasksHandler()
                    this.props.setDeleteErrMsg("")
                } else {
                    this.props.setDeleteErrMsg(response.data.message)
                }
            })
            .catch((error) => {
                this.props.setDeleteErrMsg("sorry something went wrong. please try again later.")
            })
    }
    render() {
        return (
            <div className="card bg-secondary task-card">
                <div className="card-body">
                    <div style={{textAlign: "left"}}>
                        <h4>{this.props.task.TaskName}</h4>
                        <p>status: {(this.props.task.IsCompleted)? "completed": "not completed"}</p>
                    </div>
                    <div style={{textAlign: "right"}}>
                        <div className="d-flex justify-content-end">
                            {(this.props.task.IsCompleted ? null : <div onClick={() => this.handleCompleted(this.props.task.TaskId)} className="p-2" style={{cursor: "pointer"}}><span style={{fontSize: "18px", color: "green", fontWeight: "bolder"}}>&#10004;</span> Completed</div>)}
                            <div onClick={() => this.handleRemove(this.props.task.TaskId)} style={{cursor: "pointer"}} className="p-2"><span style={{fontSize: "18px", color: "red", fontWeight: "bolder"}}>&#10005;</span> Remove</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}