import app, { init, redis } from "@/app";

const port = +process.env.PORT || 4000;

init().then(() => {
  redis.connect();
  
  app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server is listening on port ${port}.`);
  });
});
