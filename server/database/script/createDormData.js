import pkg from 'pg';

const { Client } = pkg;

// PostgreSQL connection configuration
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'vgusls_db',
  password: '020402',
  port: 5432, // default port for PostgreSQL
});

// Function to insert data into the Dorm table
const insertDormData = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Loop over areas and room names
    const areas = ['D1', 'D2'];
    for (let area of areas) {
      for (let i = 1; i <= 799; i++) {
        const roomName = i.toString().padStart(3, '0'); // Pads numbers to 3 digits
        const query = {
          text: 'INSERT INTO "Dorm" (area, room) VALUES ($1, $2)',
          values: [area, roomName],
        };

        await client.query(query); // Executes the query
        console.log(`Inserted area: ${area}, room_name: ${roomName}`);
      }
    }

    console.log('Data insertion completed');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    await client.end();
    console.log('PostgreSQL connection closed');
  }
};

// Call the function to insert the data
insertDormData();
