function handleRecent(authState, post) {
  if (!authState?.id) {
    const prev = JSON.parse(window.localStorage.getItem("nlrecent"));

    if (prev?.length !== 0 && !prev?.length) {
      window.localStorage.setItem("nlrecent", JSON.stringify([]));
    }

    const find = JSON.parse(window.localStorage.getItem("nlrecent")).find(
      (v) => v?.id === post.community.id
    );

    if (!find) {
      const c = JSON.parse(window.localStorage.getItem("nlrecent"));

      if (c.length === 3) {
        c.shift();
      }

      window.localStorage.setItem(
        "nlrecent",
        JSON.stringify([
          ...c,
          {
            name: post.community.name,
            iconImage: post.community.iconImage,
            id: post.community.id,
            themeBaseColor: post.community.themeBaseColor,
          },
        ])
      );
    }
  }
}

export { handleRecent };
