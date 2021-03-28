import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertPrice } from "./common.js";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";
import { faDoorClosed, faFontAwesomeLogoFull, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { url_course_register } from "./API.js";

class RegistryCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      size: 10,
      sizePage: 0,
      data: [],
      codeSubject: "",
    };
  }

  componentDidMount() {
    fetch(url_course_register)
      .then((res) => res.json())
      .then((json) => {
        const size = parseInt(json.totalElements / this.state.size) + 1;
        console.log(json.data);
        this.setState({
          ...this.state,
          loading: false,
          data: json.data,
          detail: new Array(json.data.length).fill(true),
          sizePage: size,
        });
      });

    console.log("call api product");
  }

  setPage = (index) => {
    const newState = Object.assign({}, this.state);
    newState.page = index;
    this.setState(newState);
  };

  read = (index, id) => {
    const newState = Object.assign({}, this.state);
    newState.data[index].isRead = 0;
    this.setState(newState);
  };

  delete = (index, id) => {
    const newState = Object.assign({}, this.state);
    newState.data = newState.data.splice(index, 1);
    this.setState(newState);
  };

  registerCourse = (index) => {
    var json = JSON.stringify({});
    fetch(url_course_register, {
      method: "post",
      body: json,
    })
      .then((res) => res.json())
      .then((json) => {});
    const newState = Object.assign({}, this.state);
    newState.data = newState.data.splice(index, 1);
    this.setState(newState);
  };

  change = (e) => {
    var newParam = Object.assign({}, this.state.props.param);
    newParam = { ...newParam, [e.target.name]: e.target.value };
    const newProps = { ...this.state.props, param: newParam };
    this.setState({ ...this.state, props: newProps });
  };

  render() {
    var listPage = [];
    for (let i = 0; i < 5; i++) {
      listPage.push(
        <li>
          <a href="#" onClick={() => this.setPage(i)}>
            {i + 1}
          </a>
        </li>
      );
    }

    return (
      <div className="container screen" style={{ fontSize: "17px" }}>
        {/* {this.state.loading && <div class="loader" id="loader"></div>} */}
        <button class="dropbtn dropup" onClick={() => this.changeModel()}>
          đăng kí
        </button>
        <input
          type="text"
          class=""
          style={{ float: "right", width: "200px", marginLeft: "100px" }}
          value={this.state.codeSubject}
        ></input>
        <h2
          className=" text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          Đăng kí Khóa học
        </h2>
        <div>
          <table>
            <tr>
              <th>STT</th>
              <th>Ngày đăng kí</th>
              <th>Ngày cập nhật</th>
              <th>Mã sinh viên</th>
              <th>Tên sinh viên</th>
              <th>Mã Khóa học</th>
              <th>Khóa đăng kí</th>
              <th></th>
            </tr>
            {this.state.data.map((feedback, index) => {
              if (
                this.state.page * this.state.size <= index &&
                index < (this.state.page + 1) * this.state.size
              ) {
                console.log(feedback);
              }
              return (
                <tr style={{ fontSize: "17px" }}>
                  <td>{index + 1}</td>
                  <td>{feedback.createAt}</td>
                  <td>{feedback.updateAt}</td>
                  <td>{feedback.student.code}</td>
                  <td>{feedback.student.fullName}</td>
                  <td>{feedback.course.code}</td>
                  <td>{feedback.course.name}</td>
                  <td>
                    <button
                      style={{ marginRight: "20px" }}
                      class="btn btn-default btn-rm"
                      onclick="deleteProduct(${product.id});"
                    >
                      <FontAwesomeIcon icon={faWindowClose} className="icon" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <ul class="pagination" id="pageTag1">
          {listPage}
        </ul>
      </div>
    );
  }
}

export default RegistryCourse;
