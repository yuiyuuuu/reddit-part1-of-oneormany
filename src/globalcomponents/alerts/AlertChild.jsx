import React, { useEffect } from "react";

import $ from "jquery";
import gsap from "gsap";

import XIconIdColor from "../../globalsvg/XIconIdColor";
import AlertIconSvg from "./svg/AlertIconSvg";

const AlertChild = ({ item }) => {
  useEffect(() => {
    $(`.alert-mapparent-${item.id}`).hover(() => {
      gsap.fromTo(
        `.alert-svgcontainer${item.id}`,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, display: "flex" }
      );

      $(`.alert-mapparent-${item.id}`).mouseleave(() => {
        gsap.fromTo(
          `.alert-svgcontainer${item.id}`,
          { opacity: 1 },
          { opacity: 0, duration: 0.3, display: "none" }
        );
      });
    });
  }, []);
  return (
    <div className={`alert-mapparent-${item.id} alert-mapparent`}>
      <div className='alert-left'>
        <div className={`alert-svgcontainer${item.id} alert-svgcontainer`}>
          <XIconIdColor size={18} color='white' id={`alert-${item.id}`} />
        </div>
      </div>
      <AlertIconSvg />

      <div className='alert-body'>{item.message}</div>
    </div>
  );
};

export default AlertChild;
