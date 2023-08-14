export default async function handler(request, response) {
    const webhookData = request.body;
    
    // Get the payload from the request:
    const payload = request.body


    // Iterate over the keys in the collection:
    for (const [keyId, keyValue] of Object.entries(payload.collection.keys)) {
      // Iterate over the translations in the key:
      for (const [lang, v] of Object.entries(keyValue.translations)) {

        if (payload.collection.keys[keyId].key.includes('⚠️')) {
            payload.collection.keys[keyId].translations[lang].translation = v.translation.replace(
                '⚠️',
                'warning!!!',
              )
         } 
        
        // Process the value of the translation:
        function unescapeXmlEntities(str) {
            return str.replace(/&([a-zA-Z0-9]+);/g, function(match, entity) {
              switch (entity) {
                case 'gt':
                  return '>';
                case 'lt':
                  return '<';
                case 'amp':
                  return '&';
                // Add more cases for other escaped entities if needed
                default:
                  return match; // Return the original match if the entity is not recognized
              }
            });
          }
          
          payload.collection.keys[keyId].translations[lang].translation = unescapeXmlEntities(v.translation);
      }
    }

    response.send(payload);
}