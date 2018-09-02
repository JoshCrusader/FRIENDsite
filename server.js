/*
  RESOURCES
  ---------
  setting up fastify:
  https://www.fastify.io/
  https://medium.freecodecamp.org/how-to-get-up-and-running-with-fastify-8b7e23781844

*/

/*
  TODO:
    1. Have a route to serve static files
    2. Have a roote route to serve index.html of polymer

*/

//const fastify = require('fastify')(); //import the fastify framework and insantiate immediately
const fastify = require('fastify')({
  logger:{ // insatiate and modify logger property
    prettyPrint: true // turn on pretty print powered by Pino logger
  }// this is to make console look nice
})
const firebase = require('./config/firebase');
const fs = require('fs')
const path = require('path')
/*
  I don't want it to be asynchronous because i dont want the server to set asidee the reply
  so I want it to focus on the reply before proceeding the main thread
*/

// Need to write schemas to optimize 10%-20% throughput
/*
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})
*/


//API for getting the blog data from firebase
fastify.get('/getBlogs', async (request, reply) =>{
  var ref = firebase.app().database().ref();

  ref.once('value').then((snap) => {
      reply.send(snap.val().Blog);
  });
  
})
fastify.register((instance, opts, next) => {
  instance.register(require('fastify-static'), {
	root: path.join(__dirname, 'Frontend', 'node_modules', '@polymer'),
	prefix: '/@polymer'
  })
  next()
})
fastify.register((instance, opts, next) => {
  instance.register(require('fastify-static'), {
	root: path.join(__dirname, 'Frontend'),
	prefix: '/'
  })
  next()
})
// fastify.register((instance, opts, next) => {
//   instance.register(require('fastify-static'), {
// 	root: path.join(__dirname, 'Frontend'),
// 	prefix: ''
//   })
//   // here `reply.sendFile` refers to 'node_modules' files
//   next()
// })


// This creates a decorator function for sending files, but it was applied by the fastify-static already
// fastify.decorateReply('sendFile', (reply, filepath) => {
//   const stream = fs.createReadStream(filepath);
//   reply.type('text/html').send(stream);
// })

fastify.get('*', async (request, reply) => {
  //reply.send({hello: 'world'})
  reply.sendFile('./Frontend/index.html', {root: '.'});
})
// fastify.get('/', async (request, reply) => {
//   return { hello: 'world' }
// })

//show me my routes
/*
fastify.ready(() => {
  console.log(fastify.printRoutes())
})
*/


//RUN THE SERVER 
fastify.listen(3000, err => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${fastify.server.address().port}`)
})

// const start = async () => {
//   try {
//     await fastify.listen(3000) //listen is a async function
//     fastify.log.info(`server listening on ${fastify.server.address().port}`)
//   } catch (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// }
// start()