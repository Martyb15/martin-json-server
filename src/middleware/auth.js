const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // 1. Grab the Authorization header
    const header = req.headers.authorization;

    // 2. If there's no header or it doesn't start with "Bearer ", reject (401)
    if (!header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // 3. Extract just the token part (everything after "Bearer ")
    const token = header.split(' ')[1]; 

    // 4. Verify the token's signature using our secret key and decode it to get the payload
    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.id // Attach the admin's Id to the request object for use in later middleware/routes
        next(); // Token is valid, proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expiredtoken' });
    }
}; 

module.exports = auth; 