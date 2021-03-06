import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Button(props) {
  return (
    <div  {...props} role="button" >
      {props.children}
    </div>
  );
}

export default Button;
