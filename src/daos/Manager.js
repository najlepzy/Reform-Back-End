class Manager {

  getSortFromParams(params) {
    if (params["sort"] != undefined)
      return { price: params["sort"] == "asc" ? 1 : -1 };
  }
  /**
   * 
   * This method removed recieved URL query fields that are not in the Object Schema.
   * 
   * @param {Object} schema_paths Object containing Schema Fields.
   * @param {Object} params Object containing query recieved via URL.
   * @returns 
   */
  getCleanFilters(schema_paths, params) {
    if(!params) return
    let to_return = {}
    let found = undefined
    Object.keys(params).forEach((key) => {
      found = Object.values(schema_paths).findIndex(e=>e.path==key)
      if(found >= 0)
        to_return[key] = params[key]
    })
    return to_return
  }
}
export default Manager;
