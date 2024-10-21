const knex = require('../db/knex');

class Feed {
    static async getFeed(limit, page) {
        const offset = (page - 1) * limit; 

        const FeedSQL = `
        SELECT posts.*, users.username, 
            CAST(COUNT(likes.post_id) AS INTEGER) AS like_count
        FROM posts 
        JOIN users ON posts.user_id = users.id 
        LEFT JOIN likes ON posts.id = likes.post_id
        GROUP BY posts.id, users.username
        ORDER BY posts.created_at DESC
        LIMIT ? OFFSET ?`

        const postCount = `SELECT COUNT(*) as total_posts FROM posts`;

        const { rows: feedData } = await knex.raw(FeedSQL, [limit, offset]);
        const { rows: [{ total_posts }] } = await knex.raw(postCount);

        return {
            data: feedData,
            totalPosts: Number(total_posts),
            totalPages: Math.ceil(total_posts / limit),
            currentPage: Number(page)
        };
    }
}

module.exports = Feed;
