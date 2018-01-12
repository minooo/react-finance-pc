import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import { Button } from "antd";
import reduxPage from "@reduxPage";
import { getHome } from "@actions";
import { imgUrl, http } from "@utils";
import { ErrorFetch, Layout } from "@components";

const util = require("util");
@reduxPage
@connect(({ home }) => ({ home }))
export default class extends Component {
  state = {};
  render() {
    const { home, err } = this.props;
    const { messageList } = this.state;
    if (err) {
      return <ErrorFetch err={err} />;
    }
    return (
      <Layout title="首页">
        <Button type="primary">hello world</Button>
      </Layout>
    );
  }
}
