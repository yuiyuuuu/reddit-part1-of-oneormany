import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import $ from "jquery";
import gsap from "gsap";

import XIconIdColor from "../../globalsvg/XIconIdColor";
import AlertIconSvg from "./svg/AlertIconSvg";
import { dispatchRemoveToAlertsQueue } from "../../store/alerts/alerts";

const AlertChild = ({ item }) => {
  const dispatch = useDispatch();

  function handleRemoveItemFromQueue() {
    const $target = $(`.alert-mapparent-${item.id}`);

    gsap.to($target, {
      scale: 0,
      duration: 0.3,
      display: "none",
    });
  }

  useEffect(() => {
    $(`.alert-mapparent-${item.id}`).hover(
      () => {
        gsap.fromTo(
          `.alert-svgcontainer${item.id}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, display: "flex" }
        );
      },
      () => {
        gsap.fromTo(
          `.alert-svgcontainer${item.id}`,
          { opacity: 1 },
          { opacity: 0, duration: 0.3, display: "none" }
        );
      }
    );
  }, [item]);

  //initial scale in animation
  useEffect(() => {
    const $target = $(`.alert-mapparent-${item.id}`);
    if ($target.css("scale") > 0.3) return;

    $(document).ready(() => {
      gsap.to($target, { scale: 1, duration: 0.5 });
    });
  }, [item]);

  useEffect(() => {
    setTimeout(() => {
      const $target = $(`.alert-mapparent-${item.id}`);

      gsap.to($target, {
        scale: 0,
        duration: 0.3,
        display: "none",
        //not going to remove stuff from the queue,
        //removing from the queue will rerender these components, resulting in animation bugs
        // onComplete: () => dispatch(dispatchRemoveToAlertsQueue(item.id)),
      });
    }, 4600);
  }, []);

  return (
    <div className={`alert-mapparent-${item.id} alert-mapparent`}>
      <div className='alert-left'>
        <div
          className={`alert-svgcontainer${item.id} alert-svgcontainer`}
          onClick={() => handleRemoveItemFromQueue()}
        >
          <XIconIdColor size={18} color='white' id={`alert-${item.id}`} />
        </div>
      </div>
      <AlertIconSvg />

      <div className='alert-body'>{item.message}</div>
    </div>
  );
};

export default AlertChild;
