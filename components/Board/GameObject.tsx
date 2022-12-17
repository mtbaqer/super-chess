import React, { FunctionComponent } from "react";
import { GameObject } from "../../types/types";
import Bishop from "./pieces/Bishop";
import Knight from "./pieces/Knight";

interface Props {
  gameObject: GameObject;
}

const GameObject: FunctionComponent<Props> = ({ gameObject }) => {
  return <div className="">{gameObject.breakable ? <Bishop /> : <Knight />}</div>;
};

export default GameObject;
