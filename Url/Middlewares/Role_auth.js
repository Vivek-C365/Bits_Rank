const roleMiddleware = (roles) => {
    return function (req, res, next) {
        const userRole = req.jwtuserplayload.role;  // Extract user role from decoded JWT payload

        if (!roles.includes(userRole)) {

            return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
        }

        next();  // User has the right role, proceed to the next middleware/controller
    };
};

module.exports = { roleMiddleware }