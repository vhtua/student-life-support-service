const sendFeedback = `
INSERT INTO "Feedback" (sender_id, title, content, created_date)
VALUES ($1, $2, $3, $4);
`;


export default { sendFeedback }; 