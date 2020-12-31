
export function range(count){
  return [...Array(count).keys()];
}
  
// batch(2, [1,2,3,4,5,6]) -> [[1,2],[3,4],[5,6]]
//batch converts flat array of image into //count = length of group
export function batch(count, arr) {
  return range(arr.length/count).map(x=> arr.slice(x*count, (x+1)*count))
}
  
export function to_image_matrix(a, b, image_data){
  const imageRows = batch(a*b, image_data.data) //512*4
  return imageRows.map(row => batch(b, row)) //4, row 
}
  
export function to_image_data(imageMatrix){
  //flatten array js
  return new Uint8ClampedArray(imageMatrix.flat().flatMap(x => [...x]));
}
  


