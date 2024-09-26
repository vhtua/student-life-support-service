const getNotificationsList = `
SELECT title, fullname, n.created_date AS created_date, content
FROM "Notification" AS n 
	INNER JOIN "User" AS u ON n.sender_id = u.id
	INNER JOIN "Notification_Audience" AS na ON na.notification_id = n.id
	INNER JOIN "Role" AS r ON r.id = na.role_id
WHERE role_name = $1
ORDER BY n.created_date DESC;
`;


const createNotification = `
INSERT INTO "Notification" (title, content, sender_id, created_date)
VALUES ($1, $2, $3, $4)
RETURNING *;
`;


const insertNotificationAudience = `
INSERT INTO "Notification_Audience" (notification_id, role_id)
VALUES ($1, $2);
`;


export default { getNotificationsList, createNotification, insertNotificationAudience }; 