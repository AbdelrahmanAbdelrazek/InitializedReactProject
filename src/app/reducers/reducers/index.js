import { map, set, upperFirst } from "lodash";
import * as handlers from './functions';
import reducersList from './reducersList';

const reducers = {};

const createReducer = reducerName => {
  let functions = {};
  map(handlers, (v, k) => functions[k.replace('__REDUCER__', upperFirst(reducerName))] = v);
  return (state = {}, action) => {
    return functions[action.type]
      ? functions[action.type](state, action)
      : state;
  }
};

reducersList.map(reducerName =>
  set(reducers, reducerName, createReducer(reducerName))
)

export default reducers