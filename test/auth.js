import chai from 'chai';
import chaiHttp from 'chai-http';
import server from 'server';

chai.should();

chai.use(chaiHttp);

describe('Authorization', () => {
  it('it should load authorization page', async () => {
    const res = await chai.request(server).get('/login').send();
    res.should.have.status(200);
  });
});
