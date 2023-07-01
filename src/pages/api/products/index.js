import { isAuthrize } from "@/middlewares/Authorizer";
import { connect } from "@/configs/mongodb.comfig";
import { Product } from "@/models/Product.model";

const get = async (req, res) => {

    const { limit, page, category } = req.query;

    const skip = limit ? limit * (page - 1 || 0) : 0;

    try {
        let data = await Product.find(category ? { category } : {}).limit(limit).skip(skip).sort({ inventory: 1 });
        const count = await Product.find(category ? { category } : {}).count();
        const total_pages = limit ? Math.ceil(count / limit) : 1
        return res.json({ data, page: page || 1, total_pages, count });
    } catch (error) {
        return res.json({ error })
    }

}

const post = async (req, res) => {
    try {
        let data = await Product.create(req.body);
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