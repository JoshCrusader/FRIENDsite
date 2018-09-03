'use strict'

const firebase = require('../../config/firebase') //db
module.exports = async function (fastify, opts) {
    
    fastify.get('/', (request, reply) => {
        var ref = firebase.app().database().ref('Blog');
        
        ref.once('value').then((snap) => {
            reply.send(snap.val());
        });
    })
}

async function registerRoutes (fastify, opts) {

}