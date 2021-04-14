import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import promise from "redux-promise-middleware";
import logger from "redux-logger";

const middlewares = [promise];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
