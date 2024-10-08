const { admin } = require('../../firebase');

const verifyFirebaseToken = async (req, res, next) => {
    const idToken = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!idToken) {
        return res.status(401).json({ error: 'No ID token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying ID token:', error);
        return res.status(401).json({ error: 'Invalid ID token' });
    }
};

module.exports = { verifyFirebaseToken };
