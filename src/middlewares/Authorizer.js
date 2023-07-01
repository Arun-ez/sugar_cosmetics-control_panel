import jwt from 'jsonwebtoken';

const isAuthrize = (req) => {

    if (!req) return false;

    if (!req.query.token) {
        return false;
    }

    try {
        jwt.verify(req.query.token, process.env.JWT_SECRET_KEY);
        return true;
    } catch (error) {
        return false;
    }

}

export { isAuthrize }