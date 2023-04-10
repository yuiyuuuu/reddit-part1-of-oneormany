import React from "react";
import ThreeDot from "../../../communities/SingleCommunityPost/scpsvgs/ThreeDot";

const UserCommentMapCh = ({ item, first, post, auth }) => {
  return (
    <div className='ucmapch-parent'>
      <div className='ucmapch-inner' style={{ paddingTop: first && "10px" }}>
        <div className='ucmapch-dotted' />
        {item?.parentId && <div className='ucmapch-dotted' />}
        <div className='ucmapch-right'>
          <div className='ucmapch-top'>
            <div className='ucmapch-f12fw300co1c1c1c uc-dechov'>
              {item?.user?.name}
            </div>
            {post?.user?.id === item?.user?.id && (
              <div className='ucmapch-op'>OP</div>
            )}

            <div className='ucmapch-f12fw300c7c ucmapch-pts'>
              {item?.upvotes?.length - item?.downvotes?.length}{" "}
              {Math.abs(item?.upvotes?.length - item?.downvotes?.length) > 1
                ? "points"
                : "point"}
            </div>

            <div className='dot-posts'>•</div>

            <div className='ucmapch-f12fw300c7c'>12 days ago</div>
          </div>

          <pre style={{ padding: "2px 0" }}>{item?.message}</pre>

          <div className='ucmapch-bot'>
            <div className='ucmapch-f12fw700c87 ucmapch-but'>Reply</div>
            <div className='ucmapch-f12fw700c87 ucmapch-but'>Share</div>

            <div className='ucmapch-three ucmapch-grhov'>
              <ThreeDot id={item?.id} />
            </div>

            {auth?.id === item?.user?.id && (
              <div className='ucmapch-t'>
                <div className='ucmapch-chp ucmapch-grhov'>Remove</div>
                <div className='ucmapch-chp ucmapch-grhov'>Spam</div>
                <div className='ucmapch-chp ucmapch-grhov'>Lock</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCommentMapCh;
