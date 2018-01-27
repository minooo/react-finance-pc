import React, { Component } from "react";
import { Layout } from "@components";

export default class extends Component {
  state = {};
  render() {
    return (
      <Layout title="关于我们" style={{ backgroundColor: "#fff" }}>
        {/* banan */}
        <div
          style={{ height: "300px", backgroundColor: "#88bdff" }}
          className="about-banner-bg"
        />
      </Layout>
    );
  }
}
