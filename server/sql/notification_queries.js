const getNotificationsList = `
SELECT title, fullname, n.created_date AS created_date, content
FROM "Notification" AS n 
	INNER JOIN "User" AS u ON n.sender_id = u.id
	INNER JOIN "Notification_Audience" AS na ON na.notification_id = n.id
	INNER JOIN "Role" AS r ON r.id = na.role_id
WHERE role_name = $1;
`;


export default { getNotificationsList }; 