import { connect } from "@/configs/mongodb.comfig";
import { Admin } from "@/models/Admin.model";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        const { token } = req.query;

        if (!token) {
            return res.send({ error: 'Unauthorized' });
        }

        try {
            let { name } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return res.send({ name, token })
        } catch (error) {
            return res.send({ error: 'Invalid Token' })
        }
    }

    await connect();

    const response = await Admin.findOne({ username, password });

    if (!response) {
        return res.send({ error: 'Unauthorized' })
    }

    const { name } = response;
    const token = jwt.sign({ name, username }, process.env.JWT_SECRET_KEY);

    return res.send({ name, token });
}

export default handler;