console.log('module');

// eslint-disable-next-line require-jsdoc
async function start() {
  return await Promise.resolve('async working');
}

start().then(console.log);
