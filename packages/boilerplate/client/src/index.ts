import express from 'express';

// tslint:disable-next-line:no-var-requires
let app = require('./server').default;

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./server', (): void => {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = Number(process.env.PORT || 3000);

export default express()
  .use((req, res): void => app.handle(req, res))
  .listen(port, (err: Error): void => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });
