const taskConfigInitialState = {
    tasks: [],
    isLoading: false
}

const taskConfig = (state = taskConfigInitialState, action) => {
    switch(action.type) {
        case "SAVE_TASKS":
            return {
                ...state,
                tasks: action.data
            }
        case "CHANGE_LOADING":
            return {
                ...state,
                isLoading: action.data
            }
    }
    return state;
}

export default taskConfig