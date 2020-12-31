import { useEffect } from 'react'
import './App.css';
import { rasteriseTriangle, triangle, vec } from './maths/geometry';
import { range, to_image_data, to_image_matrix } from './maths/utils';






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
    imageMatrix[pos.y][pos.x] = [250, 250, 50, 255]; 
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
