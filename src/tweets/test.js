/* eslint-disable jest/no-test-callback */
const request = require('supertest');
const {
  connect,
  clearDatabase,
  closeDatabase,
  createToken
} = require('../utils/testHelpers');
const server = require('../app');

let AUTH_TOKEN = null;
/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await connect();

  AUTH_TOKEN = await createToken();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await clearDatabase();
  await closeDatabase();
});

/**
 * Product test suite.
 */
describe('tweets', () => {
  let tweetedPostId = null;
  describe('[POST] /tweets', () => {
    it('Should add a tweets', async done => {
      const res = await request(server)
        .post('/tweets')
        .send({
          text: 'I am a tweet from testdev No 3'
        })
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);

      tweetedPostId = res.body.results._id;
      expect(res.body.results.text).toBe('I am a tweet from testdev No 3');
      expect(res.status).toBe(200);
      done();
    });
  });

  describe('[PUT] /tweets', () => {
    it('Should update a tweet', async done => {
      const res = await request(server)
        .put(`/tweets/${tweetedPostId}`)
        .send({
          text: 'I am updated'
        })
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);
      expect(res.status).toBe(200);
      done();
    });
  });

  describe('[GET] /tweets', () => {
    it('Should get all the tweet', async done => {
      const res = await request(server)
        .get(`/tweets`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`);
      expect(res.body.total).toEqual(1);
      expect(res.status).toBe(200);
      done();
    });
  });
});
