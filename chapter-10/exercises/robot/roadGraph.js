[Object: null prototype] {
  'Alice House': { 'Bob House': 1, Cabin: 1, 'Post Office': 1 },
  'Bob House': { 'Alice House': 1, 'Town Hall': 1 },
  Cabin: { 'Alice House': 1 },
  'Post Office': { 'Alice House': 1, Marketplace: 1 },
  'Town Hall': { 'Bob House': 1, 'Daria House': 1, Marketplace: 1, Shop: 1 },
  'Daria House': { 'Ernie House': 1, 'Town Hall': 1 },
  'Ernie House': { 'Daria House': 1, 'Grete House': 1 },
  'Grete House': { 'Ernie House': 1, Farm: 1, Shop: 1 },
  Farm: { 'Grete House': 1, Marketplace: 1 },
  Shop: { 'Grete House': 1, Marketplace: 1, 'Town Hall': 1 },
  Marketplace: { Farm: 1, 'Post Office': 1, Shop: 1, 'Town Hall': 1 }
}
