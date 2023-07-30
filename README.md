# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - Interactive comments section solution](#frontend-mentor---interactive-comments-section-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
  - [Author](#author)
  - [If you want to test](#if-you-want-to-test)

****
## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot
- Desktop
![](./design/desktop-design.jpg) 
- Mobile  
![](./design/mobile-design.jpg)

### Links


- Live Site URL: [Git hub pages](https://luisjimenez19.github.io/front-comments/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [mongo DB](https://cloud.mongodb.com/) - as database


### What I learned

I am learning nosql databases, in this case I use mongo db atlas and mongoose as ODM, it was a bit complicated for me since I know a little more about SQL, but my forte is the frontend, I solved it using recursion principles, to nest responses to comments.


## Author

- Frontend Mentor - [@luisjimenez19](https://www.frontendmentor.io/profile/luisjimenez19)



## If you want to test

1. clone this repository
2. install the dependencies
3. create a .env or .env.local file and in it write the url to your database

4. In the libs folder is the connection to the official database as given by the nextjs developers.
5. In the dbInsertData.js file are the queries to insert the initial information that is in the data.json file
6. if you were able to insert the information, check the juliusomo user id and change it in the app/config.js file

7. npm run dev to start the app
