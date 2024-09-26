const sendFeedback = `
INSERT INTO "Feedback" (sender_id, title, content, rating_score, created_date)
VALUES ($1, $2, $3, $4, $5);
`;


export default { sendFeedback }; 