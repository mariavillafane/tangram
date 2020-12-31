import { useEffect } from 'react'
import './App.css';

function range(count){
  return [...Array(count).keys()];
}

// batch(2, [1,2,3,4,5,6]) -> [[1,2],[3,4],[5,6]]
//batch converts flat array of image into //count = length of group
function batch(count, arr) {
  return range(arr.length/count).map(x=> arr.slice(x*count, (x+1)*count))
}

function to_image_matrix(a, b, image_data){
  const imageRows = batch(a*b, image_data.data) //512*4
  return imageRows.map(row => batch(b, row)) //4, row 
}

function to_image_data(imageMatrix){
  //flatten array js
  return new Uint8ClampedArray(imageMatrix.flat().flatMap(x => [...x]));
}


function vec(x,y) {
  return {
    x:x, 
    y:y
  };
}

function addVec(a, b) {
//add a + b ; a,b == vec
  return vec(a.x + b.x, a.y + b.y)
}

function multiplyVec(a, scalar){
//multiply a * scalar
  return vec(a.x * scalar, a.y * scalar)  
}

function subVec(a,b) {
//subtract a - b ; a,b == vec
  return vec(a.x - b.x, a.y - b.y)
}

function lenVec(a) {
//get length of a ; a == vec
  return Math.sqrt(a.x*a.x, a.y*a.y)
}

function getStepSize(c) {
//get amount of unitary steps along length of vec c (vector from a, to b), c == vec
  return 1.0 / Math.max(c.x,c.y)  
}

function getSteps(c) {
    return Math.max(c.x,c.y)  
  }

function triangle(a,b,c){
  return{
    a:a,
    b:b, 
    c:c
  }
}  

function roundVec(c){
  return vec(Math.round(c.x), Math.round(c.y))
}

function* rasteriseTriangle(triangle){
  const m = subVec(triangle.b,triangle.a) // b-a 
  const n = subVec(triangle.c,triangle.a) // c-b
  const o = triangle.a//triangle.b  

  const alpha = getStepSize(m) 
  const beta = getStepSize(n) 
 
  const steps_m = getSteps(m)
  const steps_n = getSteps(n)
  
  

  for (const u of range(steps_m)) {
    const steps = Math.round(steps_n*((steps_m - u)/(steps_m)))
    for (const v of range(steps)) { //(getSteps(n)-u)
      //yield u*alpha*m + v*beta*n + o;
      yield roundVec(addVec(o, addVec(multiplyVec(m,u*alpha), multiplyVec(n,v*beta)))) 
    }
  }
}

function main() {
  const canvas = document.querySelector(".inputImageCanvas");
  const img = document.querySelector(".inputImage");

  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');  
  ctx.drawImage(img, 0, 0, img.width, img.height);

  
  const imageData = ctx.getImageData(0, 0, 512, 512);
  //const newImageData = 
  //  imageData.data.map((x, index) => index< 300000 ? 50 : x );
  //console.log(newImageData);

  //i = range(512) //i = [0,1,..511]
  //const imageRows =  // imageData {length=512*512*4} -> imageRows {length=512*4} 
  //  range(512).map(x=> imageData.data.slice(x*512*4, (x+1)*512*4)) // map(lambda x: ..., i)
  
  ///const imageRows = batch(512*4, imageData.data)

  //const imageMatrix = // length: 512*4 -> 512
  //  imageRows.map(row => range(512).map(x => row.slice(x*4, (x+1)*4)))  // map(lambda x: ..., i)
  
  ///const imageMatrix = imageRows.map(row => batch(4, row))

  const imageMatrix = to_image_matrix(512, 4, imageData);
  console.log(imageMatrix);

  //triangle part
  const p = vec(1,1); 
  console.log(p, p.x, p.y);  
  const tr = rasteriseTriangle(triangle(vec(150,150), vec(150,400), vec(400,400))) //vec(0,0), vec(100,0), vec(0,200) = weird

  //[...tr].forEach(pos => { imageMatrix[pos.x][pos.y] = [255, 50, 50, 255] });
  for (const pos of tr) {
    console.log(pos);
    imageMatrix[pos.y][pos.x] = [250, 50, 50, 255]; 
  }

  const imageDataAgain = to_image_data(imageMatrix);
  console.log(imageDataAgain);

  const newImage = new ImageData(imageDataAgain, 512, 512);
  //const newImage = new ImageData(newImageData, 512, 512);
  ctx.putImageData(newImage, 0, 0);
     
}



function App() {
  useEffect(()=>{
    setTimeout(main);
  });

  return (
    <div className="App">
      <h1> Hello geometry </h1>
      <img className="inputImage" src="/mv_2020_10_512.png" />
      <canvas className="inputImageCanvas" width={500} height={500} />
      <svg width={500} height={500}>
        <circle fill="red" r={50} cx={200} cy={200} />
      </svg>
    </div>
  );
}

export default App;
