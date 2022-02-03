import React, {Component} from 'react';
import Api from '../helper/api';
import Loader from './Loader';
import TaskCard from "./TaskCard";
import ReactPaginate from 'react-paginate';


export default class Task extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskName: "",
            tasks: this.props.tasks,
            taskErrMsg: "",
            deleteUpdateErrMsg: "",
            pageCount: 0,
            totalList: 0,
            currentPage: 1,
            offset: 0,
            api: new Api()
        }
    }

    componentDidMount() {
        this.handleGetTasks(0)
    }

    setDeleteErrMsg = (msg) => {
        this.setState({
            deleteUpdateErrMsg: msg
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.tasks !== this.state.tasks) {
            this.setState({
                tasks: this.props.tasks
            })
        }
    }

    handleAddTask = async () => {
        await this.props.changeLoading(true);
        const data = {
            "user": {
                "userId": parseInt(this.props.cookies.get("todo_userid")),
                "email": this.props.cookies.get("todo_email")
            },
            "taskName": this.state.taskName,
            "isCompleted": false,
        }
        this.state.api.addNewTask(data)
            .then(async(response) => {
                console.log(response)
                if(response.data.success) {
                    await this.props.changeLoading(false)
                    await this.handleGetTasks()
                } else {
                    await this.props.changeLoading(false)
                }
            })
            .catch(async (err) => {
                await this.props.changeLoading(false);
            })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        switch(name) {
            case "taskName":
                this.setState({
                    taskName: value
                })
                break;
            default:
                break;
        }
    }

    handlePageClick = async (event) => {
        let offset = (event.selected * 5) % this.state.totalList
        this.setState({
            offset
        })
        this.handleGetTasks(offset)
    }

    handleGetTasks = async (offset) => {
        await this.props.changeLoading(true)
        const data = {
            "userId": this.props.cookies.get("todo_userid"),
            "email": this.props.cookies.get("todo_email")
        }

        this.state.api.getTasks(data, 5, offset)
            .then(async (response) => {
                if(response.data.success) {
                    await this.props.saveTasks(response.data.data)
                    let pageCount = Math.ceil(response.data.totalList / 5)
                    this.setState({
                        taskName: "",
                        pageCount,
                        totalList: response.data.totalList
                    })

                }
                await this.props.changeLoading(false)
                this.setState({
                    taskErrMsg: response.data.message
                })
            })
            .catch(async (err) => {
                await this.props.changeLoading(false)
                this.setState({
                    taskErrMsg: "Sorry, something went wrong. Please try again later."
                })
            })
    }

    render() {
        const isDisabled = !(this.state.taskName)
        return (
            <div>
                <div>
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
                </div><br/><br />
                <div>
                    <ReactPaginate
                            previousLabel={"Back"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            // marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}     
                            renderOnZeroPageCount={null}/>
                </div>
                {
                    this.props.isLoading ? 
                    <Loader message="loading..."/> : 
                
                    <div className="pt-5">
                        
                        <h3><b>Your tasks</b></h3>
                        {
                            this.state.deleteErrMsg ? 
                            <p className='pt-4'>{this.state.deleteUpdateErrMsg}</p> : null
                        }
                        {
                            this.state.tasks.length > 0 ?
                                this.state.tasks.map((task, index) => {
                                    return (
                                        <div className="pt-5" key={task.TaskId}>
                                            <TaskCard key={task.TaskId} task={task} offset={this.state.offset} setDeleteErrMsg={this.setDeleteErrMsg} 
                                            getTasksHandler={this.handleGetTasks}/>
                                        </div>
                                    )
                                })
                                : <h4 className="pt-4 text-secondary">You have not added any task.</h4>
                        }
                    </div>
                }
            </div>
        )
    } 
}