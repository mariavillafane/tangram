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

function main() {
  const canvas = document.querySelector(".inputImageCanvas");
  const img = document.querySelector(".inputImage");

  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');  
  ctx.drawImage(img, 0, 0, img.width, img.height);

  
  const imageData = ctx.getImageData(0, 0, 512, 512);
  const newImageData = 
    imageData.data.map((x, index) => index< 300000 ? 50 : x );
    
  console.log(newImageData);

  //i = range(512) //i = [0,1,..511]
  //const imageRows =  // imageData {length=512*512*4} -> imageRows {length=512*4} 
  //  range(512).map(x=> imageData.data.slice(x*512*4, (x+1)*512*4)) // map(lambda x: ..., i)
  
  ///const imageRows = batch(512*4, imageData.data)

  //const imageMatrix = // length: 512*4 -> 512
  //  imageRows.map(row => range(512).map(x => row.slice(x*4, (x+1)*4)))  // map(lambda x: ..., i)
  
  ///const imageMatrix = imageRows.map(row => batch(4, row))

  const imageMatrix = to_image_matrix(512, 4, imageData);
  console.log(imageMatrix);

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
