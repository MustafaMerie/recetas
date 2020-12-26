import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './components/Landing';
import { AuthProvider } from './StateStore/AuthProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RecipesSearch from './components/RecipesSearch';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute'
import MyAccount from './components/MyAccount';
import { RecipesProvider } from './StateStore/RecipesListProvider';
import FullRecipe from './components/FullRecipe';
import ScrollToTop from './components/ScrollToTop';
import NotFoundRoute from './components/NotFoundRoute'

function App() {
  return (

    <AuthProvider>
      <RecipesProvider>
        <Router>
          <Navigation />
          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/recipes">
              <RecipesSearch />
            </Route>
            <Route path="/recipe/:id" component={FullRecipe}></Route>
            <PrivateRoute path="/me">
              <MyAccount />
            </PrivateRoute>
            <Route>
              <NotFoundRoute />
            </Route>
          </Switch>
        </Router>
      </RecipesProvider>
    </AuthProvider>
  );
}

export default App;