import { connect } from "@/configs/mongodb.comfig";
import { Product } from "@/models/Product.model";

const get = async (req, res) => {

    const { id } = req.query;

    try {
        let data = await Product.find({ _id: id });
        return res.json({ data });
    } catch (error) {
        return res.json({ error })
    }

}

const patch = async (req, res) => {
    const { id } = req.query;

    try {
        let data = await Product.updateOne({ _id: id }, req.body);
        return res.json({ data });
    } catch (error) {
        return res.json({ error })
    }
}


const remove = async (req, res) => {
    const { id } = req.query;

    try {
        let data = await Product.deleteOne({ _id: id });
        return res.json({ data });
    } catch (error) {
        return res.json({ error })
    }
}

const handler = async (req, res) => {

    const { method } = req;

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