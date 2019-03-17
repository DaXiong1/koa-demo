const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  ctx.body = 'hello'
})

app.listen(3000)
console.log('koa is starting at port 3000')