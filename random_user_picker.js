const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const express = require("express");

const app = express();
const port = 3000;

// Sample list of users
const users = [
  { id: 1, name: "Josan" },
  { id: 2, name: "Jansase" },
  { id: 3, name: "Misaske" },
];

// Endpoint to get users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Endpoint to add a new user
app.post("/api/users", (req, res) => {
  const newUser = { id: users.length + 1, name: "New User" };
  users.push(newUser);
  res.json(newUser);
});

// Endpoint to get a randomly picked user
app.get("/api/random-user", (req, res) => {
  const randomUser = pickRandomUser(users);
  res.json(randomUser);
});

// Function to load users from a file or database
function loadUsers() {
  // Implement code to load your list of 1000 users
  // Example: return users from a JSON file
  const filePath = path.join(__dirname, "users.json");
  const usersData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(usersData);
}

// Function to pick a random user
function pickRandomUser(users) {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

// Cron job to pick a random user every 4 seconds
cron.schedule("*/4 * * * * *", () => {
  const randomUser = pickRandomUser(users);
  console.log(`Randomly picked user: ${randomUser.name}`);

  // Implement code to deposit $1 USDT to the selected user's account
  // You'll need to use a library or API to interact with your payment system
  // Example: depositFunds(randomUser, 1.0);

  // You can implement the depositFunds function to deposit funds to the user's account
});

// Start the Express server
app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
  console.log("Random user picker started.");
});
