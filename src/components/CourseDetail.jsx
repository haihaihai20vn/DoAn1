import React, { Component } from "react";
import UniqueId from "react-html-id";
import {
  api_course,
  api_course_delete,
  api_course_update,
  url_course_subject,
  token,
  api_subject,
} from "./API.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./../CSS/manageAdmin.css";
import "./../CSS/base.css";
import "./../CSS/grid.css";
import "./../CSS/responsive.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      subjectId: 3,
    };
    console.log(this.state);
  }

  componentDidMount() {
    fetch(api_course + "?id=" + this.props.id)
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          console.log("call api course detail");
          this.setState({
            ...this.state,
            data: json.data[0],
          });
        }
      });
    fetch(api_subject)
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          console.log("call api course detail");
          this.setState({
            ...this.state,
            loading: false,
            subjects: json.data,
          });
        } else {
          toast.error(json.message);
        }
      });

    console.log("call api product");
  }

  setSelectSubject = (id) => {
    console.log(id);
    this.setState({ ...this.state, subjectId: id });
  };

  add = () => {
    fetch(url_course_subject, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        courseId: this.state.data.id,
        subjectId: this.state.subjectId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          toast.success("add subject success");
          var subject = Object.assign([], this.state.data.subjects);
          console.log(subject);
          subject = [...subject, json.data.subject];

          console.log(subject);
          this.setState({
            ...this.state,
            loading: false,
            data: { ...this.state.data, subjects: subject },
          });
        } else {
          toast.error(json.message);
        }
      });
  };

  remove = (id, index) => {
    fetch(url_course_subject + "/" + id, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 200) {
          toast.success("delete subject success");
          var subject = Object.assign([], this.state.data.subjects);
          console.log(subject);
          subject.splice(index, 1);
          console.log(subject);
          this.setState({
            ...this.state,
            loading: false,
            data: { ...this.state.data, subjects: subject },
          });
        } else {
          toast.error(json.message);
        }
      });
  };

  render() {
    console.log(this.state.data);
    if (this.state.data == null || this.state.subjects == null)
      return <div></div>;
    else
      return (
        <div className="container screen" style={{ fontSize: "17px" }}>
          {this.state.loading && <div class="loader" id="loader"></div>}
          <button class="dropbtn dropup" onClick={() => this.props.back()}>
            Tr??? l???i
          </button>

          <h2
            className=" text-center head_tag"
            data-wow-duration="1s"
            data-wow-delay="0.1s"
          >
            Kh??a h???c \ {this.state.data.name}
          </h2>
          <select
            class="create_input select-type-product"
            name="carlist"
            form="carform"
            onChange={(e) => this.setSelectSubject(e.target.value)}
          >
            {this.state.subjects.map((subject, index) => {
              return <option value={subject.id}>{subject.name}</option>;
            })}
          </select>
          <button class="dropbtn dropup" onClick={() => this.add()}>
            Th??m M??n
          </button>

          <div style={{ width: "100%", display: "inline-flex" }}>
            <div style={{ backgroundColor: "#ddd", width: "50%" }}>
              <table>
                <tr>
                  <td>M?? kh??a h???c</td>
                  <td>{this.state.data.id}</td>
                </tr>
                <tr>
                  <td>T??n kh??a h???c</td>
                  <td>{this.state.data.name}</td>
                </tr>
                <tr>
                  <td>Th???i gian</td>
                  <td>{this.state.data.thoiGianHoc}</td>
                </tr>
                <tr>
                  <td>S??? l?????ng ????ng k??</td>
                  <td>1250</td>
                </tr>
              </table>
            </div>
            <div style={{ backgroundColor: "#ddd", width: "50%" }}>
              <div>C??c m??n trong ch????ng tr??nh:</div>
              <table>
                <tr>
                  <th>stt</th>
                  <th>m?? m??n h???c</th>
                  <th>t??n m??n h???c</th>
                  <th>Th???i gian h???c</th>
                  <th></th>
                </tr>
                {this.state.data.subjects.map((subject, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{subject.id}</td>
                      <td>{subject.name}</td>
                      <td>{subject.id}</td>
                      <td>
                        <button
                          style={{ marginRight: "20px" }}
                          class="btn btn-default btn-rm"
                          onClick={() => this.remove(subject.id, index)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      );
  }
}

export default CourseDetail;
