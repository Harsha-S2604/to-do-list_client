export const saveTasks = (tasks) => {
    return async(dispatch) => {
        dispatch({type: "SAVE_TASKS", data:tasks})
    }
}

export const changeLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({type:"CHANGE_LOADING", data:isLoading})
    }
}