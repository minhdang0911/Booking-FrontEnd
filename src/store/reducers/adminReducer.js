import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    isLoadingGender: false,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true,
            };

        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
                isLoadingGender: false,
            };

        case actionTypes.FETCH_GENDER_FAIDED:
            return {
                ...state,
                isLoadingGender: false,
                genders: [],
            };

        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
            };

        case actionTypes.FETCH_POSITION_FAIDED:
            return {
                ...state,
                positions: [],
            };

        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
            };

        case actionTypes.FETCH_ROLE_FAIDED:
            return {
                ...state,
                roles: [],
            };

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
            };

        case actionTypes.FETCH_ALL_USERS_FAIDED:
            return {
                ...state,
                users: [],
            };

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                topDoctors: action.dataDoctors,
            };

        case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
            return {
                ...state,
                topDoctors: [],
            };
        default:
            return state;
    }
};

export default adminReducer;
