let textArea = document.getElementById("text");
let results = document.getElementById("results");

// Your Code Here.








function functionRunning(event) {

  let text = textArea.value

  let wordArray = wordTracker(text)

  let result = {
    text: "",
    vowels: {
      a: 0,
      e: 0,
      i: 0,
      o: 0,
      u: 0
    },
    punctuation: {
      "Periods": 0,
      "Commas": 0,
      "Exclamation": 0,
      "Question Mark": 0
    },
    numCharacters: 0,
    numWords: 0,
    longestWord: "",
    shortestWord: "",
    lastThreeWords: [],
    waldoIndexes: [],
  }
  result.text = text
  result.numCharacters = text.length
  result.vowels = vowelTracker(text)
  result.punctuation = puntuationTracker(text)
  result.numWords = wordArray.length
  result.lastThreeWords = wordArray.slice(-3)
  result.longestWord = getLongestWord(wordArray)
  result.shortestWord = getShortestWord(wordArray)
  result.waldoIndexes = getWaldoIndices(text)
  console.log(result)
  printOnPage(result)
}

let vowelTracker = function (dataString) {
  dataString = dataString.toLowerCase()
  let vowelCount = {}

  for (let index = 0; index < dataString.length; index += 1) {

    let currentCharacter = dataString[index]
    console.log(currentCharacter)
    switch (currentCharacter) {
      case "a":
      case "e":
      case "i":
      case "o":
      case "u":

        if (vowelCount[currentCharacter]) {
          vowelCount[currentCharacter] += 1
        } else {
          vowelCount[currentCharacter] = 1
        }
        break;



    }

  }

  return vowelCount

}

let puntuationTracker = function (dataString) {
  dataString = dataString.toLowerCase()
  let puntuationCount = {
    "Periods": 0,
    "Commas": 0,
    "Exclamation": 0,
    "Question Mark": 0
  }

  for (let index = 0; index < dataString.length; index += 1) {

    let currentCharacter = dataString[index]
    
    switch (currentCharacter) {
      case ".":
        puntuationCount["Periods"] += 1
        break;
      case ",":
        puntuationCount["Commas"] += 1
        break;
      case "!":
        puntuationCount["Exclamation"] += 1
        break;
      case "?":
        puntuationCount["Question Mark"] += 1
        break;



    }

  }

  return puntuationCount

}


function wordTracker(dataString) {
  let wordArray = dataString.split(" ")
  let characters ="abcdefghijklmnopqrstuvwxyz'ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let filteredArray = []
  for( let word of wordArray){
    if(word !== ""){
    let charsArray = word.split("")
    let filteredChars = []
    for(let index = 0; index < charsArray.length; index += 1 ){
      let currentChar = charsArray[index]
      if(characters.includes(currentChar) === true){
        filteredChars.push(currentChar)
      }
    }
    filteredArray.push(filteredChars.join(""))
  }

}
return filteredArray
}


function getLongestWord(words) {
  
let sortedWord = [...words].sort((wordA, wordB) => wordB.length - wordA.length)
return sortedWord[0]
}


function getShortestWord(words) {
  let sortedWord = [...words].sort((wordA, wordB) => wordA.length - wordB.length)
  return sortedWord[0]
}

function getWaldoIndices(dataString) {
  
let indices = []
let searchString = "waldo"
let lowerCaseString = dataString.toLowerCase()
let searchIndex = 0
let index
while((index = lowerCaseString.indexOf(searchString, searchIndex)) > -1) {
  indices.push(index)
  searchIndex = index + searchString.length
}
return indices

}

function printOnPage(dataObjet) {
  
results.replaceChildren()

let container = document.createElement("div")
container.classList.add("container")

let title = document.createElement("h2")
title.append("Text Analysis")
container.append(title)
let columnContainer = document.createElement("div")
columnContainer.classList.add("columnContainer")
container.append(columnContainer)

let leftColumn = document.createElement("div")
leftColumn.classList.add("column")
columnContainer.append(leftColumn)


let rightColumn = document.createElement("div")
rightColumn.classList.add("column")
columnContainer.append(rightColumn)


let vowels = document.createElement("div")
vowels.classList.add("column")
leftColumn.append(vowels)

let vowelsTitle = document.createElement("h3")
vowelsTitle.append("Vowel Count")
vowels.append(vowelsTitle)

vowels.append(displayObj(dataObjet.vowels))


let punctuation = document.createElement("div")
punctuation.classList.add("column")
leftColumn.append(punctuation)

let punctuationTitle = document.createElement("h3")
punctuationTitle.append("Punctuation Count")
punctuation.append(punctuationTitle)

punctuation.append(displayObj(dataObjet.punctuation))


let numOfChars = document.createElement("h3")
numOfChars.append(`Number of Characters: ${dataObjet.numCharacters}`)
rightColumn.append(numOfChars)

let numOfWord = document.createElement("h3")
numOfWord.append(`Number of Words: ${dataObjet.numWords}`)
rightColumn.append(numOfWord)

let longWord = document.createElement("h3")
longWord.append(`Longest Word: ${dataObjet.longestWord}`)
rightColumn.append(longWord)

let shortWord = document.createElement("h3")
shortWord.append(`Shortest Word: ${dataObjet.shortestWord}`)
rightColumn.append(shortWord)

let threeWord = document.createElement("h3")
threeWord.append(`Last Three Words: ${dataObjet.lastThreeWords}`)
rightColumn.append(threeWord)

let waldos = document.createElement("h3")
waldos.append(`Waldo Indixes: ${dataObjet.waldoIndexes}`)
rightColumn.append(waldos)


results.append(container)

}

function displayObj(obj) {
  let list = document.createElement("ul")

  for(let property in obj){
let listItem = document.createElement("li")
listItem.append(`${property}: ${obj[property]}`)
list.append(listItem)
  }

  return list
}


textArea.addEventListener("keyup", functionRunning)