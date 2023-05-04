import React from "react";

import OverviewPost from "./OverviewPost";
import OverviewComment from "./OverviewComment";

const OverviewMap = ({ item, authState }) => {
  if (
    authState?.hiddenPosts
      ?.map((v) => v.id)
      .includes(item.find((v) => v.type === "post")?.data?.id)
  ) {
    return;
  }

  if (item.map((v) => v.type)?.includes("post")) {
    return <OverviewPost item={item} />;
  } else {
    return <OverviewComment item={item} />;
  }
};

export default OverviewMap;
