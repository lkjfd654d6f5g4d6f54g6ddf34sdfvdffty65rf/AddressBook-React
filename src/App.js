import "./App.css";
import React from "react";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {AddContact} from './components/AddContact';
import { Contacts } from "./components/contacts";
import { UpdateContact } from "./components/updateContact";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
          <AddContact />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/all-contacts">
            <Contacts />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/update-contacts/:id">
            <UpdateContact />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
