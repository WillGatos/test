function EliminateKey(query) {
    Object.keys(query).forEach(key => {
        if (
        query[key] === ''  ||
        query[key] === null||
        query[key] === []  ||
        query[key] === ""  ||
        query[key] === "Ninguno"||
        query[key] === "Cualquiera"
        ) {
          delete query[key];
        }
      });
      console.log(query)

  return query
}

export default EliminateKey