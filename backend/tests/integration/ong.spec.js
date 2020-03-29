const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new Ong', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "ONG Animais",
        email: "contato@onganimal.com",
        whatsapp: "559876543210",
        city: "Fortaleza",
        uf: "Ce"
      });
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});