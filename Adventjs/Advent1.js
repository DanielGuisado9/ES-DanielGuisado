//⭐⭐⭐⭐⭐
function prepareGifts(gifts) {
    // Code here
    const uniqueNumbers = [...new Set(gifts)]
    // const preparedGifts = prepareGifts(gifts)
    const ordenar = uniqueNumbers.sort((a, b) => a-b)

    return ordenar;
  }