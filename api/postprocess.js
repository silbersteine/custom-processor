async function handler(request, response) {
  const payload = request.body;
  // Iterate over the keys in the collection:
  for (const [keyId, keyValue] of Object.entries(payload.collection.keys)) {
    // Iterate over the translations in the key:
    for (const [lang, v] of Object.entries(keyValue.translations)) {
      payload.collection.keys[keyId].translations[lang].translation = payload.collection.keys[keyId].translations[lang].translation
        //.replace(/</g, '&lt;');
        .replace(/li/g, '$1%@$2')l;
        .replace(/perro/g, 'hello world');
    }
  }
  response.send(payload);
}

module.exports = {
  handler
};
