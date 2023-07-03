import { isAuthrize } from "@/middlewares/Authorizer";
import { connect } from "@/configs/mongodb.comfig";
import { Order } from "@/models/Order.model";

const get = async (req, res) => {

    const { q, limit, page, status } = req.query;

    const skip = limit ? limit * (page - 1 || 0) : 0;

    const status_list = {
        active: [0, 1, 2],
        successful: [3]
    }

    const status_criteria = { status: { $in: status_list[status] || status_criteria['active'] } };
    const search_criteria = { $or: [{ email: q || '' }, { order_id: q || '' }] }

    const find = !q ? status_criteria : search_criteria;

    try {
        let data = await Order.find(find).limit(limit).skip(skip);
        const count = await Order.find(find).count();
        const total_pages = limit ? (Math.ceil(count / limit) || 1) : 1
        return res.json({ data, page: Number(page) || 1, total_pages, count });
    } catch (error) {
        return res.json({ error })
    }

}

const post = async (req, res) => {
    try {
        let data = await Order.create(req.body);
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