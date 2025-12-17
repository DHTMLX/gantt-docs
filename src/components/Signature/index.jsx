import React from "react";
import cssstyles from "./styles.module.scss";

const Signature = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0];
  const restChildren = childrenArray.slice(1);
  
  return (
    <>
      <div className={cssstyles.signature}>
        {firstChild}
      </div>
      {restChildren.length > 0 && (
        <div>{restChildren}</div>
      )}
    </>
  );
};

export default Signature;