const getUsersList = `
SELECT
    u.id AS user_id,
    username, 
    fullname, 
    email,
    r.id AS role_id, 
    r.role_name AS role_name, 
    gender, 
    created_date, 
    program, 
    d.area AS area, 
    d.room AS room, 
    phone_number, 
    intake, 
    place_of_birth, 
    date_of_birth  
FROM  "User" AS u 
    INNER JOIN "Role" AS r ON u.role_id = r.id
    INNER JOIN "Dorm" AS d ON u.dorm_id = d.id
WHERE role_name <> 'Admin';
`;


const getUserByUserName = `
SELECT 
    username, fullname, email, r.role_name as role_name, gender, created_date, program, d.area as area, d.room as room, phone_number, intake, place_of_birth, date_of_birth  
FROM  "User" AS u 
    INNER JOIN "Role" AS r ON u.role_id = r.id
    INNER JOIN "Dorm" AS d ON u.dorm_id = d.id
WHERE
    username = $1;
`;


const changePasswordByUserName = `
UPDATE "User"
SET password = $2
WHERE username = $1;
`;


const changePhoneNumberByUserName = `
UPDATE "User"
SET phone_number = $2
WHERE username = $1;
`;


const getDorm = `
SELECT id AS dorm_id
FROM "Dorm"
WHERE area = $1 AND room = $2;
`;


const changeDormByUserId = `
UPDATE "User"
SET dorm_id = $2
WHERE id = $1;
`;


const getRoleId = `
SELECT id AS role_id
FROM "Role"
WHERE role_name = $1;
`;


const changeRoleByUserId = `
UPDATE "User"
SET role_id = $2
WHERE id = $1;
`;


const editUser = `
UPDATE "User"
SET 
    fullname = $2, 
    gender = $3, 
    program = $4, 
    phone_number = $5,
    intake = $6,
    place_of_birth = $7,
    date_of_birth = $8
WHERE id = $1;
`;



const createUser = `
INSERT INTO "User" 
    (username, 
    fullname, 
    email,
    password, 
    role_id, 
    gender, 
    program, 
    dorm_id, 
    phone_number, 
    intake, 
    place_of_birth, 
    date_of_birth,
    created_date)
VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW());
`;



const deleteUser = `    
DELETE FROM "User"
WHERE id = $1;
`;


export default { 
    getUsersList, 
    getUserByUserName, 
    changePasswordByUserName, 
    changePhoneNumberByUserName,
    getDorm,
    changeDormByUserId,
    getRoleId,
    changeRoleByUserId,
    editUser,
    createUser,
    deleteUser
}; 