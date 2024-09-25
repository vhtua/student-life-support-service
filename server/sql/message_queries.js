const getMessages = `
SELECT m.id AS id, ticket_id, sender_id, u.fullname AS "sender_fullName", message_details, m.created_date AS created_date 
FROM "Message" AS m 
	INNER JOIN "User" AS u ON m.sender_id = u.id 
WHERE ticket_id = $1 
ORDER BY created_date ASC;
`;


const getConversationId = `
-- Get conversation id == ticket id
SELECT DISTINCT t.id AS ticket_id, t.subject AS subject
FROM "Message" AS m 
	INNER JOIN "Ticket" AS t ON m.ticket_id = t.id
	INNER JOIN "User" AS u ON u.id = m.sender_id
WHERE u.id = $1;
`;

const getMessagesAudience = `
SELECT user_id
FROM "User_Ticket"
WHERE ticket_id = $1;
`


export default { getConversationId, getMessages, getMessagesAudience }; 