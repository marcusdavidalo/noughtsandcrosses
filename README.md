# Noughts and Crosses

This is a simple Tic-Tac-Toe game built using NodeJS for the backend and React.js for the frontend.

## Table of Contents

- Project Structure
- Installation Instructions
- Execution Instructions
- Compromises and Future Improvements
- Error Handling
- Code Formatting and Comments
- Simplicity
- Deployment

## Project Structure

The project is divided into two main parts: the frontend and the backend. The frontend code is located in the noughtsandcrosses repository, while the backend code is located in the noughtsandcrosses-backend repository.

The frontend code is organized into several components, including the main `App` component which contains the game logic and state management. The `App` component uses `useState` and `useEffect` hooks from React to manage the game state and handle updates from the backend server.

The backend code is responsible for managing the game state and handling requests from the frontend. It uses NodeJS and Express to create a simple REST API for making moves and resetting the game.

## Installation Instructions

1. Clone the frontend repository by running `git clone https://github.com/marcusdavidalo/noughtsandcrosses.git` in your terminal.
2. Navigate to the cloned repository by running `cd noughtsandcrosses`.
3. Install all the necessary dependencies by running `npm install`.

## Execution Instructions

1. Start the frontend server by running `npm start` in the `noughtsandcrosses` directory.
2. The game should now be accessible at `http://localhost:3000`.

## Compromises and Future Improvements

In building this project, I made some compromises in order to meet the requirements within the given time frame. For example, one issue that I encountered was that the game does not update in real-time, and I am still working on finding a solution to this problem.

In future iterations of this project, I would like to continue improving its functionality and user experience. Some potential improvements could include adding additional features such as player accounts, leaderboards, or multiplayer functionality, might include this in my portfolio.

## Error Handling

There may be some error cases that are currently unhandled in this project. These could potentially impact its functionality. For example, if there are issues with the connection to the backend server, this could cause problems with updating the game state.

In future iterations, it would be beneficial to add more robust error handling to ensure that any potential issues are handled gracefully.

## Simplicity

The focus of this project was on simplicity, both in terms of its design and implementation. The game mechanics are straightforward and should be easy enough to understand, while the user interface is clean and uncluttered.

## Deployment

The game is deployed at https://nacttcnc.vercel.app/. It uses Vercel for hosting and continuous deployment.
The backend is deployed at https://ttcnc.onrender.com/api. It uses Render as a Web Service type of deployment.
