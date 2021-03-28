import React, { Component } from "react";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [
        "bar",
        "bar active",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar",
        "bar"
      ],
    };
  }

  setActive = (index,component) => {
    this.props.event(component);
    var newState = Object.assign({}, this.state);
    newState.status.fill("bar");
    newState.status[index] = "bar active";
    console.log(newState);
    this.setState(newState);
  };

  render() {
    return (
      <div class="menu">
        <div class="head-menu">Dành cho học viên</div>
        <button
          id="m1"
          class={this.state.status[0]}
          onClick={() => this.setActive(0,'course')}
        >
          Khóa học
        </button>
        <button
          id="m2"
          class={this.state.status[1]}
          onClick={() => this.setActive(1,'subject')}
        >
          Môn học
        </button>
        <button
          id="m8"
          class={this.state.status[2]}
          onClick={() => this.setActive(2,'students')}
        >
          Thông tin học viên
        </button>
        <button
          id="m3"
          class={this.state.status[3]}
          onClick={() => this.setActive(3,'order')}
        >
          Đăng ký
        </button>
        <button
          id="m4"
          class={this.state.status[4]}
          onClick={() => this.setActive(4,'schedule')}
        >
          Lịch
        </button>
        <button
          id="m5"
          class={this.state.status[5]}
          onClick={() => this.setActive(5,'room')}
        >
          Lớp
        </button>
        <button
          id="m11"
          class={this.state.status[10]}
          onClick={() => this.setActive(10,'feedback')}
        >
          Phản hồi
        </button>
        <button
          id="m11"
          class={this.state.status[11]}
          onClick={() => this.setActive(11,'notification')}
        >
          Thông báo
        </button>
      </div>
    );
  }
}

export default Menu;
