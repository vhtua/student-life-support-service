const changePasswordByUserName = `
UPDATE "User"
SET password = $2
WHERE username = $1;`;


export default { changePasswordByUserName }; 