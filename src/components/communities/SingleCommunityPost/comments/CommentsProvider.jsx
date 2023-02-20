import React, { useContext, useEffect, useMemo, useState } from "react";

const Context = React.createContext();

export function usePost() {
  return useContext(Context);
}

export const CommentsProvider = ({ comments }) => {
  const [commentsMap, setCommentsMap] = useState([]);

  const commentsByParentId = useMemo(() => {
    const group = {};
    comments.forEach((v) => {
      group[v.parentId] ||= [];
      group[v.parentId].push(v);
    });

    return group;
  }, [comments]);

  function getReplies(parentId) {
    return commentsByParentId;
  }

  useEffect(() => {
    setCommentsMap(commentsByParentId);
  }, []);

  return (
    <Context.Provider value={{ rootComment: "hello!" }}></Context.Provider>
  );
};

export default CommentsProvider;
