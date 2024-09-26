const getUserPasswordByUsername = `
SELECT u.id AS id, username, email, password, fullname, r.role_name AS role_name
FROM "User" AS u INNER JOIN "Role" AS r ON u.role_id = r.id
WHERE username = $1 OR email = $1;`;

const getUserIdByUsername = `
SELECT id FROM "User" WHERE username = $1 OR email = $1;
`;

const getUserByEmail = `
SELECT email FROM "User" WHERE email = $1;
`;

const updateUserPassword = `
UPDATE "User" SET password = $1 WHERE email = $2;
`;



export default { getUserPasswordByUsername, getUserIdByUsername, getUserByEmail, updateUserPassword }; 