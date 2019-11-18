import { FETCH_TRAINING_CREATE_START, FETCH_TRAINING_CREATE_SUCCESS } from "../actions/training";

export const initialState = {
    trainings: [    
        {
            id: Math.random(),
            // name: 'Name',
            // training_link: 'Link',
            // training_type: 'Type'
            name: 'YouTube Training',
            training_link: 'https://www.youtube.com/watch?v=wyHbiYngzsY',
            training_type: 'YouTube'
        }
    ],
    isFetching: false,
    error: ''
};

export const trainingReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TRAINING_CREATE_START:
            return {
                ...state,
                isFetching: true,
                error: ''
            };
        case FETCH_TRAINING_CREATE_SUCCESS:
            return {
                ...state,
                trainings: action.payload,
                isFetching: false,
                error: ''
            }

        default:
            return state;
    };
};

export default trainingReducer;