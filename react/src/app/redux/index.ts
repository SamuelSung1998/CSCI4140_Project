import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './root-reducer';
import rootEpic from './root-epic';
import history from './history';

// create epic middleware
const epicMiddleware = createEpicMiddleware();

// use redux devtool plugin on development
const composeEnhancers = (process.env.NODE_ENV === 'development' && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(history)));

// rehydrating state on start
const initialState = {};

// store creation
const store = createStore(rootReducer, initialState, enhancer);

epicMiddleware.run(rootEpic);

export default store;

// export the type of dispatch
export type AppDispatch = typeof store.dispatch;

export { default as rootAction } from './root-action';
