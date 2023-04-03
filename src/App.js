import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import store from './redux/store';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div className="meals">
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            {/* <object
            className="rocksGlass"
            type="image/svg+xml"
            data={ rockGlass }
          >
            Glass
          </object> */}
            <Route path="/meals" component={ Recipes } />
            <Route path="/" component={ Login } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
