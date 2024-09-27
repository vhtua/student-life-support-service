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



const createDorm = `
INSERT INTO "Dorm" (area, room) VALUES ($1, $2);
`;


const deleteDorm = `
DELETE FROM "Dorm" WHERE area = $1 AND room = $2;
`;


export default { getDormArea, getDormRoomByArea, createDorm, deleteDorm };