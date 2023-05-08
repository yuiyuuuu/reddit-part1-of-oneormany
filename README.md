# Reddit Clone

## Notes

Still under construction</br>
Planned:</br>

- Nested comment system -- done</br>
- Most of reddit community and post features -- posts features mostly done, community moderators and settings still needs work</br>
- View user profiles and have a karma system -- currently working on</br>
- More once done</br>

## Deployed Project

https://redditclone1.herokuapp.com/ </br>

## Tech Stack :books:

Below is a non-exhaustive list of technologies used throughout the project.

| Front End |  Backend   | Other Libraries | Compiler |
| :-------: | :--------: | :-------------: | :------: |
|   React   |  Express   |     jQuery      |   Vite   |
|   HTML    | PostgreSQL |      Redux      |          |
|   SCSS    |   Prisma   |      axios      |          |
|           | bcrypt/JWT |                 |          |

## Copyright and Monetization

This application is solely for my educational purposes only. No monetization on this app.

Every piece of code, from frontend to backend was written by me, or copied from a public online source. Anything on the app that has "© 2023 Reddit Inc" or similar is for cloning purpose and not affilated with or developed by Reddit.

The Reddit logo is used in this application for cloning purposes only, and not used in any other way or for any other purposes.

The application's frontend is an attempt to make a replica of Reddit's frontend and for my educational purposes only.

This application is deployed to heroku in order to have a live demo of my technical skills for others(recruiters, collegues, etc)

This application was built through reverse engineering, only using information that are publicly available. No source code of Reddit was found or used during development.

## Functionality

Below will be a list of functionalities and how each one works in my application.

# Comments

- All comments has a parentId. If a comment's parentId is null, it means it is a root comment.
- Sort all comments for a post/query into an object. The keys will be parentIds and their respective values will the children comments.
- Recursively call the CommentList and Comment component. In the Comment component, we will check if the current comment's id is in the object. If it is, that means the comment has children comment(s), so we will call CommentList again.
- This solution is very different than Reddit's and is branched from WedDevSimplified's nested comment Youtube video, but is still very different in almost every aspect.
- Link to the video: https://www.youtube.com/watch?v=lyNetvEfvT0&t=2703s

# Karma

- (8.27 _ 103 _ votes) / (votes + 8.52 \* 103) is the function. Votes is the # of upvotes - # of downvotes
- When a user votes, subtract the previous amount of karma gained from the post/comment from the user's karma, then recalculate karma based on the vote (up, down, remove up, remove down) and then add that onto the user's karma.

## Setup :rocket:

```
npm install
npm run dev2
```
