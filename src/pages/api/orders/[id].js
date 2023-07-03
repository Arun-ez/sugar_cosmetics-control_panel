import { isAuthrize } from "@/middlewares/Authorizer";
import { connect } from "@/configs/mongodb.comfig";
import { Order } from "@/models/Order.model";

const get = async (req, res) => {

    const { id } = req.query;

    try {
        let data = await Order.find({ _id: id });
        return res.json({ data });
    } catch (error) {
        return res.json({ error })
    }

}

const patch = async (req, res) => {
    const { id } = req.query;

    try {
        let data = await Order.updateOne({ _id: id }, req.body);
        return res.json({ data });
    } catch (error) {
        return res.json({ error })
    }
}


const remove = async (req, res) => {
    const { id } = req.query;

    try {
        let data = await Order.deleteOne({ _id: id });
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

    if (method !== 'GET' && method !== 'PATCH' && method !== 'DELETE') {
        return res.status(404).send({ error: `${method} not supported` });
    }

    await connect();

    if (method === 'GET') {
        return get(req, res);
    } else if (method === 'PATCH') {
        return patch(req, res);
    } else if (method === 'DELETE') {
        return remove(req, res);
    }

}

export default handler;