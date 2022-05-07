import { combineReducers } from "redux";

const memberReducer = (state = {members: []}, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
            break;
        case 'upLike':
            return { ...state, members: action.payload };
            break;
        case 'changeMode':
            return { ...state, members: action.payload };
            break;
		default:
			return state;
	}
};

const youtubeReducer = (state = {youtube: []}, action) => {
    switch (action.type) {
        case "SET_YOUTUBE" :
            return {...state, youtube: action.payload};
            break;
        default: 
            return state;
    }
}

const galleryReducer = (state = {flicker: []}, action) => {
    switch (action.type) {
        case "SET_FLICKER" :
            return {...state, flicker: action.payload};
        default :
            return state;
    }
}

const reducers = combineReducers({
    memberReducer, 
    youtubeReducer,
    galleryReducer,
});


export default reducers;