import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertPrice } from "./common.js";
import {url_student} from "./../API"

import "./../../CSS/manageAdmin.css";
import "./../../CSS/main.css";
import { faEdit, faEye, faFontAwesomeLogoFull, faLock, faTrashAlt, faUserLock } from "@fortawesome/free-solid-svg-icons";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      size: 10,
      sizePage: 0,
      data: [],
    };
  }

  componentDidMount() {
    fetch(url_student)
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
      <div
        id="screen4"
        className="container screen"
        style={{ fontSize: "17px" }}
      >
        {this.state.loading && <div class="loader" id="loader"></div>}
        <h2
          className=" text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          Thông báo
        </h2>
        <div>
          <table>
            <tr>
              <th>ID</th>
              <th>Họ tên</th>
              <th>Ngày sinh</th>
              <th>Trạng thái</th>
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
                    <td style={{ width: "15%" }}>{feedback.fullName}</td>
                    <td style={{ width: "15%" }}>{feedback.status}</td>
                    <td style={{ width: "17%" }}>
                      <button
                        style={{ marginRight: "20px" }}
                        class="btn btn-default btn-rm"
                        onclick="deleteProduct(${product.id});"
                      >
                        <FontAwesomeIcon icon={faLock} className="icon" />
                      </button>
                      <button
                        class="btn btn-default btn-ud"
                        onClick={() => this.changeModel()}
                      >
                        <FontAwesomeIcon icon={faEdit} className="icon" />
                      </button>
                      <button
                        class="btn btn-default btn-dt"
                        onClick={() => this.setDetail(feedback.id)}
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
      </div>
    );
  }
}

export default Students;
