function useDeleteEmptyKey (object){
    Object.keys(object).forEach(key => {
        if (object[key] === ''||object[key] === null||object[key] === []||object[key] === "") {
          delete object[key];
        }
      });
      return object
}
export default useDeleteEmptyKey;