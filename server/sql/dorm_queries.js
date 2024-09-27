const getDormArea = `
SELECT
    DISTINCT
    area AS dorm_area
FROM 
    "Dorm"
ORDER BY dorm_area ASC;
`;


const getDormRoomByArea = `
SELECT
    DISTINCT
    room AS dorm_room
FROM 
    "Dorm"
WHERE 
    area = $1
ORDER BY dorm_room ASC;
`;



export default { getDormArea, getDormRoomByArea };