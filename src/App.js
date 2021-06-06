import React from "react";
import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Details from "./pages/details/Details";
import "App.css";
import Home from "./pages/home/Home";
import Search from "./pages/search-page/SearchPage";
// import thumb from "./thumb1.jpg";

//Import Components

const App = () => (
  <>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />

        {/* <Route path="/movie/:id"> */}
        <Route path="/movie">
          <Details />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </Router>
  </>
);

export default App;
