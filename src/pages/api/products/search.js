import { connect } from "@/configs/mongodb.comfig";
import { Product } from "@/models/Product.model";

const get = async (req, res) => {

    const { q, limit, page } = req.query;

    const skip = limit ? limit * (page - 1 || 0) : 0;

    try {
        let data = await Product.find({ $text: { $search: q } }).limit(limit).skip(skip).sort({ inventory: 1 });
        const count = await Product.find({ $text: { $search: q } }).count();
        const total_pages = (limit ? Math.ceil(count / limit) : 1) || 1
        return res.json({ data, page: page || 1, total_pages, count });
    } catch (error) {
        return res.json({ error })
    }

}

const handler = async (req, res) => {

    const { method } = req;

    if (method !== 'GET') {
        return res.status(404).send({ error: `${method} not supported` });
    }

    await connect();

    return get(req, res);
}

export default handler;