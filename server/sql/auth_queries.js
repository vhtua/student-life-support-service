const getUserPasswordByUsername = `
SELECT u.id AS id, username, email, password, r.role_name AS role_name
FROM "User" AS u INNER JOIN "Role" AS r ON u.role_id = r.id
WHERE username = $1 OR email = $1;`;


const getUserIdByUsername = `SELECT id FROM "User" WHERE username = $1 OR email = $1`;

export default { getUserPasswordByUsername, getUserIdByUsername }; 