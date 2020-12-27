import {UserActionTypes} from "./user-types";
export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user     /*payload is optional value we put it if we want to change state value*/
});