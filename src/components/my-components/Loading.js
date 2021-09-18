import { connectStateResults } from "react-instantsearch-dom";
import React from "react";
const Loading = ({ searching, children }) => (
  <div>
    <p style={{ display: searching ? "block" : "none" }}>Loading...</p>
    <div style={{ display: searching ? "none" : "block" }}>{children}</div>
  </div>
);

export default connectStateResults(Loading);
