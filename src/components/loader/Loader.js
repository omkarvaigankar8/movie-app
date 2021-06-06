import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

function Loader({ loading }) {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  let [color, setColor] = useState("#ffffff");
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#010b19",
        zIndex: 20,
      }}
    >
      <ScaleLoader color={color} loading={loading} css={override} size={150} />
    </div>
  );
}

export default Loader;
