import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import UserReducer from "./user/user-reducer";
import cartReducer from "./cart/cart-reducer";

//before applying redux-persist: 
/*
export default combineReducers ({
    user : UserReducer,
    cart : cartReducer
});
*/
//mn awel hena 3shan l redux persist: 
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const rootReducer = combineReducers ({
    user : UserReducer,
    cart : cartReducer
});

export default persistReducer(persistConfig, rootReducer);