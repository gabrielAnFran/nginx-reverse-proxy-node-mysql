/**
 * file: src/index.js
 * description: file responsible for running the application.
 * data: 05/29/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

// Import required modules
const express = require('express');
const mysql = require('mysql2/promise');

// Initialize Express app and set port
const app = express();
const PORT = 3000;

// Database configuration
const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'fullcycle',
};

// Define root route
app.get('/', (_req, res) => {
  InsertName(res);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Application running on Port...: ${PORT} 🚀`);
});

// Function to get a random ASOIAF character name
function getName() {
    const names = [
      'Daenerys Targaryen',
      'Jon Snow',
      'Tyrion Lannister',
      'Arya Stark',
      'Cersei Lannister',
      'Jaime Lannister',
      'Sansa Stark',
      'Eddard Stark',
      'Brienne of Tarth',
      'Petyr Baelish'
    ];
    const RANDOM = Math.floor(Math.random() * names.length);
    return names[RANDOM];
  }

  async function InsertName(res) {
    let connection;
    try {
      const name = getName();
      connection = await mysql.createConnection(dbConfig);
  
      const INSERT_QUERY = `INSERT INTO people(name) values(?)`;
      await connection.execute(INSERT_QUERY, [name]);
  
      console.log(`${name} inserted successfully in the database!`);
      await getAll(res, connection);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred');
    } finally {
      if (connection) await connection.end();
    }
  }
  
  // Function to retrieve all names from the database and display them
  async function getAll(res, connection) {
    try {
      const SELECT_QUERY = `SELECT id, name FROM people`;
      const [results] = await connection.execute(SELECT_QUERY);
  
      res.send(`
        <h1>Full Cycle Rocks!</h1>
        ${results.map((result) => `<p>${result.id} - ${result.name}</p>`).join('')}
      `);
    } catch (error) {
      console.error('Error listing people:', error);
      res.status(500).json({ error: 'Error getting people' });
    }
  }