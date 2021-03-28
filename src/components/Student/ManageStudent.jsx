import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./../../CSS/base.css";
import "./../../CSS/main.css";
import "./../../CSS/grid.css";
import "./../../CSS/responsive.css";
import "./../../CSS/management.css";

import Menu from "./Menu.jsx";
import Class from "./../Class";
// import ChartRender from "./ChartRender.jsx";
// import NotificationS from "./NotificationS.jsx";
// import FeedBack from "./FeedBack";
 import Course from "./../Course";
 import Subject from "./../Subject";
 import Students from "./../Student";
// import Schedule from "./Schedule";
// import Room from "./Room";
// import History from "./History";
// import Infrastructure from "./Infrastructure";
// import RegistryCourse from "./RegistryCourse";
// import User from "./User.jsx";

class ManageStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: "course",
      showModal: false,
      dataDetail: {},
    };
  }

  changeScreen = (screen) => {
    const newState = Object.assign({}, this.state);
    newState.screen = screen;
    this.setState(newState);
  };

  render() {
    return (
      <>
        <div className="app">
          <ToastContainer className="toast-down-right"/>
          <Menu event={this.changeScreen}></Menu>
          {this.state.screen === "course" && <Course />}
          {this.state.screen === "subject" && <Subject />}
          {this.state.screen === "student" && <Students />}
          {this.state.screen === "class" && <Class />}
          
        </div>
      </>
    );
  }
}

export default ManageStudent;
