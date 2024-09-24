const getAnnouncementList = `
SELECT title, fullname, a.created_date AS created_date, content
FROM "Announcement" AS a 
	INNER JOIN "User" AS u ON a.sender_id = u.id
ORDER BY a.created_date DESC;
`;


export default { getAnnouncementList }; 