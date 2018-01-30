import React, { Component } from "react";
import { Layout } from "@components";

export default class extends Component {
  static getInitialProps({ query: { id } }) {
    return { id };
  }
  state = {};
  render() {
    const { id } = this.props
    return <Layout title="资讯详情">资讯详情{id}</Layout>;
  }
}
