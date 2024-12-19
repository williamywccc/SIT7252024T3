const request = require('supertest');
const { expect } = require('chai');
const app = require('../controller'); // 引入未啟動的 app

describe('API Endpoints', () => {
    before(() => {
        const model = require('../model');
        // Mock 模型邏輯
        model.getAllProducts = () => [
            { id: 1, name: 'Product 1', price: 10 },
            { id: 2, name: 'Product 2', price: 20 },
        ];

        model.getProductById = (id) => {
            const products = model.getAllProducts();
            return products.find((product) => product.id === id) || null;
        };

        model.purchaseProduct = (id) => {
            const product = model.getProductById(id);
            if (product) {
                return { success: true, product };
            }
            return { success: false, message: 'Product not found' };
        };
    });

    describe('GET /api/products', () => {
        it('should return all products', async () => {
            const res = await request(app).get('/api/products');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(2);
        });
    });

    describe('GET /api/products/:id', () => {
        it('should return a product if the ID exists', async () => {
            const res = await request(app).get('/api/products/1');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id', 1);
        });

        it('should return 404 if the product does not exist', async () => {
            const res = await request(app).get('/api/products/999');
            expect(res.status).to.equal(404);
            expect(res.text).to.equal('Product not found');
        });
    });

    describe('POST /api/products/:id/purchase', () => {
        it('should purchase a product if the ID exists', async () => {
            const res = await request(app).post('/api/products/1/purchase');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id', 1);
        });

        it('should return 400 if the product does not exist', async () => {
            const res = await request(app).post('/api/products/999/purchase');
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error', 'Product not found');
        });
    });
});
