import { combineReducers } from "redux";

let initMember = {
    members : [
        {
            name: "Tom",
            position: "CEO",
            pic: "member1.jpg",
            like: 0
        },
        {
            name: "Julia",
            position: "Vice President",
            pic: "member2.jpg",
            like: 0
        },
        {
            name: "Emma",
            position: "Back-end Developer",
            pic: "member3.jpg",
            like: 0
        },
        {
            name: "David",
            position: "Designer",
            pic: "member4.jpg",
            like: 0
        }
    ]
}

const memberReducer = (state = initMember, action) => {
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

const reducers = combineReducers({
    memberReducer, youtubeReducer,
});


export default reducers;