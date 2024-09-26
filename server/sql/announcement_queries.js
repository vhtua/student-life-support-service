const getAnnouncementList = `
SELECT title, fullname, a.created_date AS created_date, content
FROM "Announcement" AS a 
	INNER JOIN "User" AS u ON a.sender_id = u.id
ORDER BY a.created_date DESC;
`;


const createAnnouncement = `
INSERT INTO "Announcement" (title, content, sender_id, created_date)
VALUES ($1, $2, $3, $4);
`;


export default { getAnnouncementList, createAnnouncement }; 