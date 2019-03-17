const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')

let home = new Router() // 每嵌套一层路由就要多声明一个Router实例

// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{
  ctx.body = '404 page!'
}).get('/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page!'
})

// 子路由1
home.get('/', async ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

// 装载所有子路由
let router = new Router()
// 装载顺序无所谓
router.use('/page', page.routes(), page.allowedMethods())
router.use('/', home.routes(), home.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('koa-router is starting at port 3000')
})