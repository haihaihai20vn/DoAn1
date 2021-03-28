import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertPrice } from "./common.js";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";
import { faFontAwesomeLogoFull } from "@fortawesome/free-solid-svg-icons";

class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      size: 10,
      sizePage: 0,
      data: [
        {
          id: 1,
          createdAt: "19-03-2021 06:00:00",
          createdBy: "ngo quang hieu",
          content: "phản hồi từ ngô hiếu",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
      ],
    };
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
        {/* {this.state.loading && <div class="loader" id="loader"></div>} */}
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
              <th>Thời gian</th>
              <th>Người tạo</th>
              <th>Nội dung</th>
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
                      onClick={() => this.read(index, feedback.id)}
                    >
                      {feedback.id}
                    </td>
                    <td style={{ width: "15%" }}>{feedback.createdAt}</td>
                    <td style={{ width: "15%" }}>{feedback.createdBy}</td>
                    <td>{feedback.content}</td>
                    <td style={{ width: "5%" }}>
                      <button
                        className="btn btn-default btn-rm"
                        onClick={() => this.delete(index, feedback.id)}
                      >
                        <FontAwesomeIcon icon="window-close" className="icon" />
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

export default FeedBack;
