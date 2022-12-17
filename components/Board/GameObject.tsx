import React, { FunctionComponent } from "react";
import { GameObject } from "../../types/types";
import Bishop from "./pieces/Bishop";

interface Props {
  gameObject: GameObject;
}

const GameObject: FunctionComponent<Props> = ({ gameObject }) => {
  return (
    <div className="">
      <Bishop />
    </div>
  );
};

export default GameObject;
