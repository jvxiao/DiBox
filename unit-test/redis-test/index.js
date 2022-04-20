
const redis = require('redis')

const cli = redis.createClient(6379, '127.0.0.1')
cli.connect()
// cli.ping()
cli.on('err', err => {
  console.error(err)
})

cli.set('ggg', 'gggg').then(res => console.log('res', res)).catch(err => console.log(err))
// cli.quit()

// const val = await cli.get('ggg')
// console.log(val)
// cli.get('ggg', (err, val) => {
//   if (err) {
//     console.log(err)
//     return 
//   }
//   console.log('val', val)
//   cli.quit()
// })
cli.get('fasf').then(res => { console.log(res), cli.quit() }).catch(err => { console.log('err', err), cli.quit()})