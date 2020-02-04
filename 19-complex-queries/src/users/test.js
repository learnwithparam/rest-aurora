const { mockResponse } = require('../utils/testHelpers/interceptors');
const { getUserTweets } = require('./controller');

jest.mock('../tweets/model', () => ({
  find: jest.fn().mockReturnValue([
    {
      createdBy: '5aa06bb80738152cfd536fdc',
      message: 'im a tweet 1'
    },
    {
      createdBy: '5aa06bb80738152cfd536fdc',
      message: 'im a tweet 2'
    }
  ])
}));

afterAll(() => {
  jest.resetModules();
});

describe('User Controller', function() {
  it('Should return user tweets', async () => {
    const req = {
      params: {
        id: '5aa06bb80738152cfd536fdc'
      }
    };
    const res = mockResponse();

    await getUserTweets(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'ok',
      results: [
        {
          createdBy: '5aa06bb80738152cfd536fdc',
          message: 'im a tweet 1'
        },
        {
          createdBy: '5aa06bb80738152cfd536fdc',
          message: 'im a tweet 2'
        }
      ]
    });
  });
});
