const app = require('koa')();
const router = require('koa-router')();
const db = require('./db.json');

// Log requests
app.use(function *(next){
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

router.get('/aff/users-aff', function *(next) {
  this.body = db.users;
});

router.get('/aff/users-aff/:userId', function *(next) {
  const id = parseInt(this.params.userId);
  this.body = db.users.find((user) => user.id == id);
});

router.get('/aff/threads-aff', function *() {
  this.body = db.threads;
});

router.get('/aff/threads-aff/:threadId', function *() {
  const id = parseInt(this.params.threadId);
  this.body = db.threads.find((thread) => thread.id == id);
});

router.get('/aff/posts-aff/in-thread/:threadId', function *() {
  const id = parseInt(this.params.threadId);
  this.body = db.posts.filter((post) => post.thread == id);
});

router.get('/aff/posts-aff/by-user/:userId', function *() {
  const id = parseInt(this.params.userId);
  this.body = db.posts.filter((post) => post.user == id);
});

router.get('/aff/', function *() {
  this.body = "API ready to receive requests";
});

router.get('/', function *() {
  this.body = "Ready to receive requests";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
