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


const getAttachmentsByTicketId = `
SELECT a.id as id, a.attachment_type AS type, a.attachment_name AS name, url
FROM "Attachment" AS a INNER JOIN "Ticket" AS t ON a.ticket_id = t.id
WHERE t.id = $1;
`;


const getTicketTypeList = `
SELECT id, ticket_type_name AS ticket_type
FROM "Ticket_Type";
`;


const getTicketAudienceTypeList = `
SELECT id, audience_type_name AS audience_type
FROM "Audience_Type";
`;


// Creating a ticket queries
const insertIntoTicket = `
INSERT INTO "Ticket" (created_date, ticket_type_id, subject, content, audience_type_id, ticket_status_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id AS ticket_id;
`; 

const insertIntoUserTicket = `
INSERT INTO "User_Ticket" (user_id, ticket_id)
VALUES ($1, $2);
`;

const insertIntoAttachment = `
INSERT INTO "Attachment" (attachment_type, attachment_name, url, ticket_id, created_date)
VALUES ($1, $2, $3, $4, $5);
`;


const insertIntoMessage = `
INSERT INTO "Message" (ticket_id, sender_id, message_details, created_date)
VALUES ($1, $2, 'I have just created this ticket', $3);
`;

// const createTicket = `


// -- Insert into the Ticket table and return the ticket_id
// WITH new_ticket AS (
//   INSERT INTO "Ticket" (created_date, ticket_type_id, subject, content, audience_type_id, ticket_status_id)
//   VALUES ($1, $2, $3, $4, $5, $6)
//   RETURNING id AS ticket_id
// )

// -- Insert into the User_Ticket table using the returned ticket_id
// INSERT INTO "User_Ticket" (user_id, ticket_id)
// VALUES ($7, (SELECT ticket_id FROM new_ticket));

// -- Insert into the Attachment table using the returned ticket_id
// INSERT INTO "Attachment" (attachment_type, attachment_name, url, ticket_id, created_date)
// VALUES ($8, $9, $10, (SELECT ticket_id FROM new_ticket), $11);

// `;


const rateTicket = `
INSERT INTO "Rating" (ticket_id, rating_score, created_date)
VALUES ($1, $2, $3);
`;


const getRating = `
SELECT rating_score
FROM "Rating"
WHERE ticket_id = $1;
`;


export default { 
	getTicketsList, 
	getTicketDetails, 
	getTicketTypeList, 
	getTicketAudienceTypeList, 
	getAttachmentsByTicketId,
	insertIntoTicket,
	insertIntoUserTicket,
	insertIntoMessage,
	insertIntoAttachment,
	rateTicket,
	getRating
}; 