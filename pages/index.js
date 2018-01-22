import React, { Component } from "react";
import { connect } from "react-redux";
import reduxPage from "@reduxPage";
import { Layout } from "@components";

@reduxPage
@connect(({ home }) => ({ home }))
export default class extends Component {
  state = {};
  render() {
    return (
      <Layout title="首页">
        首页
      </Layout>
    );
  }
}
