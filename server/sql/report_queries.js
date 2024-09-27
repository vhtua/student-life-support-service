const getNumberOfTicketsByStatus = `
SELECT
    COUNT (t.id) AS count
FROM "Ticket" AS t
	INNER JOIN "Ticket_Status" AS ts ON t.ticket_status_id = ts.id
WHERE
	ts.status_name = $1 AND
    t.created_date BETWEEN $2 AND $3;
`;


export default { getNumberOfTicketsByStatus };