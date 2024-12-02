import { Router } from 'express';
import Product from '../models/Product.js';
import mongoosePaginate from 'mongoose-paginate-v2';

productSchema.plugin(mongoosePaginate);




const router = Router();

router.get('/', async (req, res) => {
    try {
        const {
            limit = 10,
            page = 1,
            sort,
            query,
        } = req.query;

        const filter = query ? { $or: [{ title: new RegExp(query, 'i') }, { category: new RegExp(query, 'i') }] } : {};

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined,
        };

        const result = await Product.paginate(filter, options);

        res.json({
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}` : null,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});
