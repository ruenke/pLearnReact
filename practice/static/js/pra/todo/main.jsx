import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

const store = createStore(todoApp);
// 打印初始状态
console.log(store.getState());
store.subscribe(() => {
    console.log(store.getState());
});
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
