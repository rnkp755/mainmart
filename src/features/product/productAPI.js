function extractPrices(inputString) {
  const regex = /(\d+)-(\d+)/;
  const matches = inputString.match(regex);

  if (matches) {
    return {
      lowerPrice: parseInt(matches[1]),
      higherPrice: parseInt(matches[2])
    };
  } else {
    return null;
  }
}

export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchProductsByFilters(filter) {
  // filter = {"category":"smartphone"}
  // TODO : on server we will support multi values
  // TODO : Multiple category attributes
  let queryString = '';
  for (let key in filter) {
    if (key === "category" && Array.isArray(filter[key])) {
      filter[key].forEach((value) => {
        queryString += `${key}=${value}&`
      })
      continue;
    }
    else if (key === "price") {
      // TODO : Multiple Price attribute
      console.log(filter[key][0], "and", filter[key][filter[key].length - 1]);
      const lowerPrice = extractPrices(filter[key][0]).lowerPrice;
      const higherPrice = extractPrices(filter[key][filter[key].length - 1]).higherPrice;
      console.log(lowerPrice, higherPrice);
      queryString += `${key}_lte=${higherPrice}&`
    }
    else {
      queryString += `${key}=${filter[key]}&`
    }
    console.log(queryString);
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products?' + queryString)
    const data = await response.json()
    resolve({ data })
  }
  );
}