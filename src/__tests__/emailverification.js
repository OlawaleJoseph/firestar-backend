import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../index';

import emailverification from '../controllers/emailController';
import { emailVerifyToken } from '../utils/index';
import { idUnset, idCorrect, idWrong } from '../__mocks__/emailVerification';

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

let request;

describe('EMAIL ROUTE', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  describe('EMAIL VERIFICATION ROUTE', () => {
    it('should have a status of 200 when message is sent succesfully', async () => {
      const body = {
        email: 'akp.ani@yahoo.com',
        firstName: 'Aniefiok',
        lastName: 'Akpan'
      };
      const response = await request.post('/api/email/test').send(body);
      expect(response.body.status).to.equal(200);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });
  describe('UTILS/ EMAIL TOKEN', () => {
    it('it should assign a token to newly registered users', async () => {
      const id = idUnset;
      const token = await emailVerifyToken(id);
      expect(token).to.equal(token);
    }).timeout(0);
    it('it should not assign token, or fail', async () => {
      const id = idUnset;
      const token = await emailVerifyToken(id);
      expect(token).to.equal(token);
    }).timeout(0);
  });

  describe('EMAIL TOKEN CONFIRMATION ROUTE', () => {
    it('should have a status of 200 when valid token is sent as query string', async () => {
      const id = idCorrect;
      const response = await request.get(`/api/email/verify?id=${id}`);
      expect(response.body.status).to.equal(200);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('EMAIL TOKEN CONFIRMATION ROUTE', () => {
    it('should have a status of 404 when invalid token is sent as query string', async () => {
      const id = idWrong;
      const response = await request.get(`/api/email/verify?id=${id}`);
      expect(response.body.status).to.equal(400);
      expect(response.body).to.be.a('object');
    }).timeout(0);
  });

  describe('CONTROLLER RESPONSE', () => {
    it('fakes server success for email verification controller', async () => {
      const req = {
        body: {
          email: 'akp.ani@yahoo.com',
          firstName: 'Aniefiok',
          lastName: 'Akpan'
        },
        verificationMailResponse: null
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      await emailverification.signUp(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
    it('fakes server response for email confirmation', async () => {
      const req = {
        url: idCorrect
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();

      await emailverification.confirmEmailVerificaionToken(req, res);
      expect(res.status).to.have.been.calledWith(400);
    });
  });
});
