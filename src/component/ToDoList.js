import React, {Component} from "react";
import TaskCard from "./TaskCard";

export default class ToDoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            tasks: []
        }
    }

    componentDidMount() {
        const responseJson = {	
            success: true,
            tasks: [
                        {
                            "TaskName": "demo_1",
                            "IsCompleted": false
                        },
                        {
                            "TaskName": "demo_2",
                            "IsCompleted": true
                        },
                        {
                            "TaskName": "demo_3",
                            "IsCompleted": true
                        },
                        {
                            "TaskName": "demo_4",
                            "IsCompleted": false
                        },
                        {
                            "TaskName": "demo_5",
                            "IsCompleted": false
                        }
                    ]
        }

        this.setState({
            tasks: responseJson.tasks
        })
    }

    handleAddTask = () => {
        console.log(this.state.taskName)
    }

    handleChange = (event) => {
        const {name, value} = event.target
        switch(name) {
            case "taskName":
                this.setState({
                    taskName: value
                })
            default:
                break;
        }
    }
    render() {
        const isDisabled = !(this.state.taskName)
        return (
            <div style={{paddingTop: "70px"}}>
                <center>
                    <div>
                        <h1>To-Do List</h1>
                        <div className="pt-5">
                            <input placeholder="type your task here" 
                                className="todo__input" 
                                type="text"
                                name="taskName"
                                id="taskName"
                                onChange={this.handleChange}
                                value={this.state.taskName}/>
                            <button className="btn btn-outline-light" onClick={this.handleAddTask} style={{marginLeft:"20px"}} disabled={isDisabled}>add</button>
                        </div>
                    </div>
                    <div className="pt-5">
                        <h3><b>Your tasks</b></h3>
                        {
                            this.state.tasks.map((task, index) => {
                                return (
                                    <div className="pt-5">
                                        <TaskCard task={task} key={index} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </center>
            </div>
        )
    }
}