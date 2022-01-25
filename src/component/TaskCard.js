import React, {Component} from 'react';

export default class TaskCard extends Component {
    
    handleCompleted = () => {
        console.log("completed")
    }

    handleRemove = () => {
        console.log("removed")
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
                            {(this.props.task.IsCompleted ? null : <div onClick={this.handleCompleted} className="p-2" style={{cursor: "pointer"}}><span style={{fontSize: "18px", color: "green", fontWeight: "bolder"}}>&#10004;</span> Completed</div>)}
                            <div onClick={this.handleRemove} style={{cursor: "pointer"}} className="p-2"><span style={{fontSize: "18px", color: "red", fontWeight: "bolder"}}>&#10005;</span>Remove</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}