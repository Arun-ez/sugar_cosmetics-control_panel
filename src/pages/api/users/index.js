import { isAuthrize } from "@/middlewares/Authorizer";
import { connect } from "@/configs/mongodb.comfig";
import { User } from "@/models/User.model";

const get = async (req, res) => {

    const { limit, page, email } = req.query;

    const skip = limit ? limit * (page - 1 || 0) : 0;

    try {
        let data = await User.find(email ? { email } : {}).limit(limit).skip(skip)
        const count = await User.find(email ? { email } : {}).count();
        const total_pages = limit ? Math.ceil(count / limit) : 1
        return res.json({ data, page: page || 1, total_pages, count });
    } catch (error) {
        return res.json({ error })
    }
}

const post = async (req, res) => {
    try {
        let data = await User.create(req.body);
        return res.json({ data });
    } catch (error) {
        return res.json({ error })
    }
}

const handler = async (req, res) => {

    const { method } = req;

    if (!isAuthrize(req)) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    if (method !== 'GET' && method !== 'POST') {
        return res.status(404).send({ error: `${method} not supported` });
    }

    await connect();

    if (method === 'GET') {
        return get(req, res);
    } else if (method === 'POST') {
        return post(req, res);
    }

}

export default handler;