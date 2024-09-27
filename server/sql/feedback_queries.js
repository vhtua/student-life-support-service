const getAllFeedbacks = `
SELECT 
	id AS feedback_id,
	rating_score,
	created_date,
	title
FROM "Feedback"
ORDER BY created_date DESC;
`;


const getFeedbackById = `
SELECT
    id AS feedback_id,
    rating_score,
    created_date,
    title,
    content
FROM "Feedback"
WHERE id = $1;
`;


const sendFeedback = `
INSERT INTO "Feedback" (sender_id, title, content, rating_score, created_date)
VALUES ($1, $2, $3, $4, $5);
`;



export default { getAllFeedbacks, getFeedbackById, sendFeedback }; 