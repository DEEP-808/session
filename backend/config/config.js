module.exports = {
    web_port: process.env.PORT || 3000,
    MONGO_connectStr: process.env.MONGO_connectStr || '',
    session_secret : process.env.SESSION_SECRET || 'hehe'
}