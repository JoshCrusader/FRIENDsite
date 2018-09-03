/*
  RESOURCES
  ---------
  setting up fastify:
  https://www.fastify.io/
  https://medium.freecodecamp.org/how-to-get-up-and-running-with-fastify-8b7e23781844

  TODO:
    1. Have a route to serve static files
    2. Have a roote route to serve index.html of polymer

*/

/*
  logger - logger property of fastify
  prettyPrint - uses Pino logger to log outputs
*/
const fastify = require('fastify')({
  logger:{
    prettyPrint: true
  }
})

const path = require('path') //package for using paths


//API for getting the blog data from firebase
/*
  instance - fastify itself
  fastiffy static  - serve static files to your web pages
  root - where the static files could be located
  prefix - prefix of the url of where its located
*/
fastify
  .register(require('./API/getBlogs'), {prefix: '/api/getBlogs'})
  .register((instance, opts, next) => {
    instance.register(require('fastify-static'), {
    root: path.join(__dirname, 'Frontend', 'node_modules', '@polymer'),
    prefix: '/@polymer'
    })
    next()
  })
  .register((instance, opts, next) => {
    instance.register(require('fastify-static'), {
    root: path.join(__dirname, 'Frontend'),
    prefix: '/'
    })
    next()
  })


// This creates a decorator function for sending files, but it was applied by the fastify-static already
// fastify.decorateReply('sendFile', (reply, filepath) => {
//   const stream = fs.createReadStream(filepath);
//   reply.type('text/html').send(stream);
// })

fastify.get('*', async (request, reply) => {
  //reply.send({hello: 'world'})
  reply.sendFile('./Frontend/index.html', {root: '.'});
})


//RUN THE SERVER ON PORT 3000
fastify.listen(3000, err => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${fastify.server.address().port}`)
})