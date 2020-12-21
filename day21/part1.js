const fs = require('fs')

const file = fs.readFileSync('data.txt', 'UTF-8');

const lines = file.split(/\r?\n/);

const data = lines.map((line) => {
  const [ingredients, allergens] = line.split(' (')
  return {
    ingredients: ingredients.split(' '),
    allergens: allergens.replace(/,/g, '').replace('contains ', '').replace(')', '').split(' '),
  }
}).sort((a,b) => a.allergens.length - b.allergens.length)

console.log(data)

const allergensMap = {}

while(data.some(({allergens}) => allergens.some(allergen => !allergensMap[allergen] || allergensMap[allergen].length > 1))) {
  data.forEach(({ingredients, allergens}, index) => {
    const unmappedAllergens = allergens.filter(allergen => !allergensMap[allergen] || allergensMap[allergen].length > 1)
    const otherItems = data.slice(0,index).concat(data.slice(index + 1))
    unmappedAllergens.forEach(allergen => {
      const itemsWithSameAllergen = otherItems.filter(({allergens}) => allergens.includes(allergen))
      const alreadyMappedIngredients = Object.values(allergensMap).filter(ingredients => ingredients.length === 1).flatMap(ingredients => ingredients)
      // console.log('alreadyMappedIngredients', alreadyMappedIngredients)
      const unmappedIngredients = ingredients
        .filter(ingredient => !alreadyMappedIngredients.includes(ingredient)) 
      // console.log('allergen', allergen, 'unmappedIngredients', unmappedIngredients)
      const commonIngredients = unmappedIngredients.length === 1 ? unmappedIngredients : unmappedIngredients 
        .filter(ingredient => 
            itemsWithSameAllergen.every(otherItem => 
              otherItem.ingredients.includes(ingredient)))
      console.log('allergen', allergen, 'commonIngredients', commonIngredients)

      allergensMap[allergen] = allergensMap[allergen] ? allergensMap[allergen].filter(ingredient => commonIngredients.includes(ingredient)): commonIngredients
    })
  })
}

console.log('allergensMap', allergensMap)
const ingredientsMap = Object.entries(allergensMap).reduce((result, [allergen, ingredients]) => {
  result[ingredients[0]] = allergen
  return result
}, {})

const unmappedIngredients = data.flatMap(({ingredients}) => ingredients).filter(ingredient => !ingredientsMap[ingredient])

console.log('result1', unmappedIngredients.length, unmappedIngredients)

