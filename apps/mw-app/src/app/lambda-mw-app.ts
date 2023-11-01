import serverless from 'serverless-http';
import { MwServer } from '../mw-server';

module.exports.handler = function (evt, ctx) {
  return new MwServer().app
    .then((app) => {
      return serverless(app, { provider: 'aws' })(evt, ctx);
    })
    .catch((err) => console.log(err));
};
