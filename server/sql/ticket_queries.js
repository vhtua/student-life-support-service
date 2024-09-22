const getTicketsList = `
SELECT 
	t.id AS ticket_id, 
	tt.ticket_type_name AS ticket_type_name,
	t.subject AS subject,
	at.audience_type_name AS audience_type, 
	ts.status_name AS status_name, 
	t.created_date AS created_date, 
	t.ended_date AS ended_date
FROM "Ticket" AS t 
	INNER JOIN "User_Ticket" AS ut ON t.id = ut.ticket_id
	INNER JOIN "User" AS u ON ut.user_id = u.id
	INNER JOIN "Ticket_Type" AS tt ON t.ticket_type_id = tt.id
	INNER JOIN "Ticket_Status" AS ts ON t.ticket_status_id = ts.id
	INNER JOIN "Audience_Type" AS at ON t.audience_type_id = at.id
WHERE 
	username = $1;
`;

const getTicketDetails = `
SELECT 
	t.id AS ticket_id,
	t.created_date AS created_date, 
	t.ended_date AS ended_date,
	tt.ticket_type_name AS ticket_type_name,
	t.subject AS subject,
	t.content AS details,
	at.audience_type_name AS audience_type, 
	m.id AS message_id,
	ts.status_name AS status

FROM "Ticket" AS t 
	INNER JOIN "User_Ticket" AS ut ON t.id = ut.ticket_id
	INNER JOIN "User" AS u ON ut.user_id = u.id
	INNER JOIN "Ticket_Type" AS tt ON t.ticket_type_id = tt.id
	INNER JOIN "Ticket_Status" AS ts ON t.ticket_status_id = ts.id
	INNER JOIN "Audience_Type" AS at ON t.audience_type_id = at.id
	-- INNER JOIN "Attachment" AS a ON t.id = a.ticket_id
	INNER JOIN "Message" AS m ON t.id = m.ticket_id
WHERE 
	username = $1 AND
	t.id = $2;
`;


export default { getTicketsList, getTicketDetails }; 