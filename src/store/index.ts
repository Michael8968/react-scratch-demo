/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store.ts
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import scratchReducer from 'scratch-gui/src/reducers';
import type { Store } from 'redux';

// 定义 RootState 类型（根据 scratch-gui 的 reducer 结构调整）
export interface RootState {
  scratch: any;
}

const rootReducer = combineReducers({
  scratch: (state: any) => state || {},
});

const store: Store<RootState> = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware())
);

export default store;