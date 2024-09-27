const getRoles = `
SELECT 
    id AS role_id, 
    role_name
FROM 
    "Role"
    ORDER BY role_name;
`;


export default { getRoles };