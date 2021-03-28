import React, { Component, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseForm from "./../../CourseForm";
import CourseDetail from "./../../CourseDetail";
import { api_course, api_course_delete, token } from "./../API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertPrice, withSuffix } from "./../common";

import "./../../CSS/manageAdmin.css";
import "./../../CSS/main.css";
import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      size: 10,
      sizePage: 0,
      data: [],
      index: -1,
      showModal: false,
      isDetail: false,
      idDetail: -1,
      param: {},
    };
  }

  componentDidMount() {
    fetch(api_course)
      .then((res) => res.json())
      .then((json) => {
        const size = parseInt(json.totalElements / this.state.size) + 1;
        console.log(json.data);
        this.setState({
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

  setData = (data, index) => {
    var newData = Object.assign([], this.state.data);

    if (index === -1) {
      console.log("***********");
      console.log(newData.length);
      newData = [data, ...newData];
      console.log(data);
      console.log(newData);
    } else newData[index] = data;

    const newState = { ...this.state, data: newData };
    this.setState(newState);
  };

  delete = (index, id) => {
    this.state.loading = true;
    fetch(api_course_delete + id, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          const newState = Object.assign({}, this.state);
          newState.data.splice(index, 1);
          this.setState({ ...newState, loading: false });
          toast.success("Delete Successful");
        }
      });
  };

  detail = (id) => {
    var newState = Object.assign({}, this.state);
    newState.isDetail = true;
    newState.idDetail = id;
    fetch(api_course + "?id=" + id, {})
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          console.log("code 200");
        }
      });
    this.setState(newState);
  };

  changeModel = (dataSet, index) => {
    var newState = Object.assign({}, this.state);
    newState.showModal = !newState.showModal;
    if (dataSet != null)
      newState = { ...newState, param: dataSet, index: index };
    else newState = { ...newState, param: dataSet, isCreate: true };

    this.setState(newState);
  };

  back = () => {
    this.setState({ ...this.state, isDetail: false });
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

    if (this.state.isDetail) {
      return (
        <CourseDetail id={this.state.idDetail} back={() => this.back()} />
      );
    } else
      return (
        <div className="container screen" style={{ fontSize: "17px" }}>
          {this.state.loading && <div class="loader" id="loader"></div>}
          <button class="dropbtn dropup" onClick={() => this.changeModel()}>
            Thêm mới
          </button>
          <h2
            className=" text-center head_tag"
            data-wow-duration="1s"
            data-wow-delay="0.1s"
          >
            Khóa học
          </h2>
          <div>
            <table>
              <tr>
                <th>ID</th>
                <th>Mã khóa học</th>
                <th>Tên khóa học</th>
                <th>Người dạy</th>
                <th>Giá</th>
                <th>Số lượng đăng kí</th>
                <th>Số lượng đăng kí mới</th>
                <th></th>
              </tr>
              {this.state.data.map((feedback, index) => {
                if (
                  this.state.page * this.state.size <= index &&
                  index < (this.state.page + 1) * this.state.size
                )
                  return (
                    <tr style={{ fontSize: "17px" }}>
                      <td
                        style={{
                          width: "5%",
                          fontSize: "17px",
                        }}
                      >
                        {feedback.id}
                      </td>
                      <td style={{ width: "15%" }}>{feedback.value}</td>
                      <td style={{ width: "15%" }}>{feedback.name}</td>
                      <td style={{ width: "15%" }}>{feedback.createdBy}</td>
                      <td>{convertPrice(feedback.price)}</td>
                      <td></td>
                      <td></td>
                      <td style={{ width: "17%" }}>
                        <button
                          style={{ marginRight: "20px" }}
                          class="btn btn-default btn-rm"
                          onClick={() => this.delete(index, feedback.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                        </button>
                        <button
                          class="btn btn-default btn-ud"
                          onClick={() => this.changeModel(feedback, index)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="icon" />
                        </button>
                        <button
                          class="btn btn-default btn-dt"
                          onClick={() => this.detail(feedback.id)}
                        >
                          <FontAwesomeIcon icon={faEye} className="icon" />
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
          {this.state.showModal ? (
            <div className="modal" style={{ display: "flex" }}>
              <div class="modal__overlay"></div>
              <div class="modal__body">
                <CourseForm
                  param={this.state.param}
                  eventBack={() => this.changeModel()}
                  setData={this.setData}
                  index={this.state.index}
                ></CourseForm>
              </div>
            </div>
          ) : null}
        </div>
      );
  }
}

export default Course;
