const getStudentList = `
SELECT username, fullname, email, r.role_name as role_name, gender, created_date, program, d.area as area, d.room as room, phone_number, intake, place_of_birth, date_of_birth  
FROM  "User" AS u 
    INNER JOIN "Role" AS r ON u.role_id = r.id
    INNER JOIN "Dorm" AS d ON u.dorm_id = d.id
WHERE role_name = 'Student';
`;


export default { getStudentList }; 