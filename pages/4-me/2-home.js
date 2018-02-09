import React, { Component } from "react";
import { MeSelection, NoData } from "@components";

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { pathname } = ctx;

    return { pathname };
  }
  render() {
    const { pathname } = this.props
    return (
      <MeSelection pathname={pathname}>
        home
        <NoData />
      </MeSelection>
    )
  }
}
