import React, { PureComponent } from "react";
import PlayScreen from "./gui/PlayScreen";
import querystring from "query-string";
import { Analytics } from "@vercel/analytics/react";

export default class App extends PureComponent {
  render() {
    const route = window.location.hash;

    const screen = route.startsWith("#/join")
      ? <PlayScreen token={this.inviteToken} />
      : <PlayScreen />;

    return (
      <>
        {screen}
        <Analytics />
      </>
    );
  }

  UNSAFE_componentWillMount() {
    this._listener = window.addEventListener("hashchange", (e) => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this._listener);
  }

  get inviteToken() {
    return querystring.parse(window.location.search).token;
  }
}