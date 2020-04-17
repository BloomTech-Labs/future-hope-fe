import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer";
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance,
} from "redux-firestore";
import {
  reactReduxFirebase,
  getFirebase,
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";
import firebase from "firebase/app";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "./assets/scss/mdb.scss";

import App from "./App";
import "./components/styles/index.css";
import fbConfig from "./config/fbConfig";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   rootReducer,
//   composeEnhancers(
//     applyMiddleware(
//       thunk.withExtraArgument({
//         getFirebase,
//         getFirestore
//       })
//     ),
//     reactReduxFirebase(fbConfig, {
//       useFirestoreForProfile: true,
//       userProfile: "users",
//       //training: "training"
//     }),
//     reduxFirestore(fbConfig)
//   )
// );

const middlewares = [thunk.withExtraArgument([getFirebase, getFirestore])];
const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);
const rrfConfig = { useFirestoreForProfile: true, userProfile: "users" };
const rrfProps = {
  firebase,
  dispatch: store.dispatch,
  createFirestoreInstance,
  config: rrfConfig,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <App />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
