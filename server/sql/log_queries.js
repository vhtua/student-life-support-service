const getLogs = `
SELECT 
	l.id AS log_id,
	event_type_name,
	l.timestamp AS timestamp,
	l.description AS description,
	l.user_id AS user_id,
	u.username AS username,
	u.fullname AS fullname,
	r.role_name AS role_name
FROM "Log" AS l
	INNER JOIN "Event_Type" AS et ON l.event_id = et.id
	INNER JOIN "User" AS u ON l.user_id = u.id
	INNER JOIN "Role" AS r ON r.id = u.role_id
ORDER BY l."timestamp" DESC;
`;

export default { getLogs };