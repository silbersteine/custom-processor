'use strict'

module.exports = async function (fastify) {
  fastify.post('/postprocess', async function (request, reply) {
    if (!request.body) {
      return { error: 'Invalid request: Missing body' }
    }

    const payload = request.body

    for (const [keyId, keyValue] of Object.entries(payload.collection.keys)) {
      for (const [lang, v] of Object.entries(keyValue.translations)) {
        payload.collection.keys[keyId].translations[lang].translation = v.translation.replace(
          /flying\sdutchman/gi,
          '',
        )
      }
    }

    await reply.send(payload)
  })
}