//copy and paste

/*
community-

      include: {
        posts: {
          include: {
            comments: {
              include: {
                user: true,
              },
              orderBy: {
                id: "asc",
              },
            },
            user: true,
            community: {
              include: {
                users: true,
              },
            },
          },
        },
        users: {
          select: {
            name: true,
            id: true,
            photo: true,
            password: false,
          },
        },
        owner: true,
      },
*/

/* comments-

*/

/* posts- 

*/

//copy and paste below

const includes = {
  community: {
    include: {
      posts: {
        include: {
          comments: {
            orderBy: {
              id: "asc",
            },
            include: {
              user: true,
            },
          },
          user: true,
          community: {
            include: {
              users: true,
            },
          },
        },
      },
      users: {
        select: {
          name: true,
          id: true,
          photo: true,
          password: false,
        },
      },
      owner: true,
    },
  },

  comment: {},
};
