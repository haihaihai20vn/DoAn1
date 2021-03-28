import React, { Component } from "react";
import UniqueId from "react-html-id";
import { api_course, api_course_delete, api_course_update, token } from "./../API.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./../../CSS/manageAdmin.css";
import "./../../CSS/base.css";
import "./../../CSS/grid.css";
import "./../../CSS/responsive.css";

class CourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreate: false,
      props: props,
      loading: false,
    };
    if (props.param == null) {
      this.state.isCreate = true;
    }
    console.log(this.state);
  }

  change = (e) => {
    var newParam = Object.assign({}, this.state.props.param);
    newParam = { ...newParam, [e.target.name]: e.target.value };
    const newProps = { ...this.state.props, param: newParam };
    this.setState({ ...this.state, props: newProps });
  };

  create = (e) => {
    e.preventDefault();
    var bodyRequest = JSON.stringify(this.state.props.param);
    console.log(bodyRequest);
    this.state.loading = true;
    fetch(api_course, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: bodyRequest,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("--------");
        console.log(json);
        this.props.setData(json.data,-1);
        this.props.eventBack();
        toast.success("Create Successful");
      });
  };

  update = (e) => {
    e.preventDefault();
    console.log(this.state.props.param);
    var bodyRequest = JSON.stringify(this.state.props.param);
    // this.props.eventChange();
    this.state.loading = true;
    fetch(api_course_update + this.state.props.param.id, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization:token
      },
      body: bodyRequest,
    })
      .then((res) => res.json())
      .then((json) => {
        
        this.props.setData(json.data,this.props.index);
        console.log(json);
        this.props.eventBack();
        toast.success("Update Successful");
      });
  };

  render() {
    return (
      <form id="update-product-form" className="create-form fm">
        {this.state.loading && <div class="loader" id="loader"></div>}
        <div className="auth-form__container">
          <div className="auth-form__header">
            <div className="auth-form__heading">Cập nhật</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flexBasis: "100%" }}>
              <div className="create_groups">
                <label>Mã Khóa học</label>
                <input
                  type="text"
                  name="value"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.value
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Tên</label>
                <input
                  name="name"
                  type="text"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.name
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Giá</label>
                <input
                  name="price"
                  type="number"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.price
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Thời gian (tháng)</label>
                <input
                  name="thoiGianHoc"
                  type="number"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.thoiGianHoc
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
              <div className="create_groups">
                <label>Chi Tiết</label>
                <input
                  name="detail"
                  type="text"
                  value={
                    this.state.props.param != null
                      ? this.state.props.param.details
                      : ""
                  }
                  onChange={this.change.bind(this)}
                />
              </div>
            </div>
          </div>
          <div className="auth-form__controls">
            <button
              id="update-back_btn"
              className="btn create_btn_cancel back-btn"
              onClick={this.state.props.eventBack}
            >
              TRỞ LẠI
            </button>
            <button id="update-cancel_btn" className="btn create_btn_cancel">
              HỦY
            </button>
            <button
              id="update-btn"
              className="btn create_btn_cancel"
              onClick={(e) => {
                this.state.isCreate ? this.create(e) : this.update(e);
              }}
            >
              {this.state.isCreate ? "THÊM" : "CẬP NHẬT"}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default CourseForm;