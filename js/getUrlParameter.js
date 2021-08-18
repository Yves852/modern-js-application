const getUrlParameter = key => {
  let result = undefined, tmp = [];

  let items = window.location.search.substr(1).split("&");

  for (let index = 0; index < items.length; index++) {
      tmp = items[index].split("=");

      if (tmp[0] === key){
          result = decodeURIComponent(tmp[1]);
      }
  }
  return result;
}

export { getUrlParameter }