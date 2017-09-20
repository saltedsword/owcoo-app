import React from 'react';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

export default App;
