import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/redux_store';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import List from './components/List/ContainerList';

const App = () => {
    return (
      <BrowserRouter>
      <div className='app-wrapper'>
        <Header/>
        <div className='main-content'>
            <Switch>
              <Route path='/list' render={()=> <List/> } />
              <Route path='/auth/login' render={()=> <Login/> } />
              <Route path='/auth/logout' render={()=> <Login/> } />
              <Route path='/profile' render={()=> <Profile/> } />
              <Route path='/' exact><Redirect to='/profile'/></Route>
              <Route path='*' render={() => <div>404</div>} />
            </Switch>
        </div>
      </div>
      </BrowserRouter>
    )
}

const ToDoList = () => {
  return (
      <BrowserRouter>
          <Provider store={store}>
              <App/>
          </Provider>
      </BrowserRouter>
  )
}
export default ToDoList;
