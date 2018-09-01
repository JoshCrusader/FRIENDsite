/*
  RESOURCES
  ---------
  setting up fastify:
  https://www.fastify.io/
  https://medium.freecodecamp.org/how-to-get-up-and-running-with-fastify-8b7e23781844

*/
//const fastify = require('fastify')(); //import the fastify framework and insantiate immediately
const fastify = require('fastify')({
  logger:{ // insatiate and modify logger property
    prettyPrint: true // turn on pretty print powered by Pino logger
  }// this is to make console look nice
})

//DECLARE STANDARD ROUTE AND REPLY WITH A JSON

/*
  I don't want it to be asynchronous because i dont want the server to set asidee the reply
  so I want it to focus on the reply before proceeding the main thread
*/
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

// fastify.get('/', async (request, reply) => {
//   return { hello: 'world' }
// })

//show me my routes
fastify.ready(() => {
  console.log(fastify.printRoutes())
})


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