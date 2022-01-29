const taskConfigInitialState = {
    tasks: [],
    isLoading: false
}

const taskConfig = (state = taskConfigInitialState, action) => {
    switch(action.type) {
        case "SAVE_TASKS":
            let t = []
            if(action.data != null) {
                t = action.data
            }
            return {
                ...state,
                tasks: t
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