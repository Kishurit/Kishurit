import React from "react";
import "../style/well.css";

export default function Well({ className, style, children, lg, sm, ...props }) {
  const generateClassName  = () => {
    let myClass = `well ${className ? className : ''} `;
    if (!(sm || lg) || (lg && sm)) return myClass;
    else if (lg) return myClass + ' well-lg';
    else if (sm) return myClass + ' well-sm';
  };
  
  return (
    <div className={generateClassName () + " " + className} style={style} {...props}>
      {children}
    </div>
  );
}
