import "./App.css";

import { Component, useState } from "react";
import ManageAdmin from './components/ManageAdmin.jsx'
import ManageStudent from "./components/Student/ManageStudent";


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <ManageAdmin></ManageAdmin>
      </div>
    );
  }
}

export default App;
