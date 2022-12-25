var router = require('koa-router')();
const jf = require('jsonfile')

const filepath = './data/info.json'

router.get('/', function* (next) {
  this.body = { code: 1, message: 'ok' }
});

router.post('/set', function* (next) {
  let data = {}
  try {
    data = jf.readFileSync(filepath)
  } catch (err) {
    console.log(err)
  }
  let info = this.request.body
  if (!info.name || !info.wish) {
    this.body = { code: 0 }
    return
  }
  info = {
    name: info.name,
    wish: info.wish,
    code: 0,
    res: '',
    ip: this.request.ip
  }
  if (data[info.name])
    data[info.name].unshift(info)
  else
    data[info.name] = [info]

  jf.writeFileSync(filepath, data)

  this.body = { code: 1 }
});

router.post('/get', function* (next) {
  let data = {}
  try {
    data = jf.readFileSync(filepath)
  } catch (err) {
    console.log(err)
    this.body = { code: 0 }
    return
  }
  let info = this.request.body
  if (!info.name) {
    this.body = { code: 0 }
    return
  }
  this.body = data[info.name][0]
})

module.exports = router;
