import { combineReducers } from "redux";
import reducers from './reducers';
import { reducer as formReducer } from "redux-form";
import { createStore } from "redux";
export const rootReducer = combineReducers({
  ...reducers,
  form: formReducer
});

const store = createStore(rootReducer);
// +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store;
