'use strict'

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-http-client'))

  fastify.post('/preprocess', async function (request, reply) {
    if (!request.body) {
      return { "error" : "Invalid request: Missing body"};
    }

    const payload = request.body;

    for (const [keyId, keyValue] of Object.entries(payload.collection.keys)) {

      for (const [lang, v] of Object.entries(keyValue.translations)) {
        if(v.languageId === 640) {
          const res = await fastify.curl('https://api.funtranslations.com/translate/pirate.json&text=' + v.translation).then((result) => {
            const translated = JSON.parse(result.data.toString())
            payload.collection.keys[keyId].translations[lang].translation = translated.contents.translated
          }).catch((err) => {
            payload.collection.keys[keyId].translations[lang].translation = v.translation
          })
        }
      }
    }

    return payload;
  })
}