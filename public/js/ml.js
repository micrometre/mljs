const realPriceNextDay = 225
const currentStockPrice = 220
const change = 0.0001
let weight=1.01


const meanSquaredError = (prediction, real)=> {
  return (prediction - real) ** 2
}

const predict = (data, weight) => data * weight

const adjustWeight = (currentWeight, errorUp, errorDown) => {
  if (errorUp < errorDown) {
    return currentWeight + change
  }
  return currentWeight - change
}

const trainModel = (target, epochs) => {
  for(let i = 0; i < epochs; i++) {
    const guessUp = predict(currentStockPrice, weight + change)
    const guessDown = predict(currentStockPrice, weight - change)
    const errorUp = meanSquaredError(guessUp, target)
    const errorDown = meanSquaredError(guessDown, target)
    weight = adjustWeight(weight, errorUp, errorDown)
  }
}

const makePrediction = (msg) => {
  console.group(msg)
  let prediction = predict(currentStockPrice, weight)
  let error = meanSquaredError(prediction, realPriceNextDay)
  console.log(`The real stock price is ${realPriceNextDay} USD`)
  console.log(`Stock price prediction is ${prediction} USD`)
  console.log(`meanSquaredError = ${error}`)
  console.groupEnd()
}

makePrediction('BEFORE TRAINING')
trainModel(realPriceNextDay, 1000)
makePrediction('AFTER TRAINING')


