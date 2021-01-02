import { useEffect, useState } from 'react'
import './App.css';
import { triangle, vec, drawAverageTriangles } from './maths/geometry';
import { to_image_data, to_image_matrix } from './maths/utils';





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
  const triangles = [triangle(vec(175,175), vec(175,200), vec(200,200)), triangle(vec(75,75), vec(75,100), vec(100,100))];
  drawAverageTriangles(triangles, imageMatrix);


  

  const imageDataAgain = to_image_data(imageMatrix);
  console.log(imageDataAgain);

  const newImage = new ImageData(imageDataAgain, 512, 512);
  //const newImage = new ImageData(newImageData, 512, 512);
  ctx.putImageData(newImage, 0, 0);
     
}

function Counter() {
  console.log('rendering Counter');
  const [i, setVarI] = useState([0]); //this initiates i=0
  console.log({i});
  
  return (
    <button onClick={() => {
      console.log('button clicked');
      i[0]=i[0]+1;
      setVarI(i); //setVarI(i+1); as i is list of 1 elem
      // const j = [i[0]+1];
      // setVarI(j); 
      console.log('I updated to ', i);
    }}>{i}</button>
  )
}


function App() {
  
  useEffect(()=>{
    setTimeout(main);
  });

  function onClickHandler(event) {
    const rect = event.target.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    console.log({x,y});
  }

  // React.createElement('div', ...)
  return (
    <div className="App">
      <h1> Hello geometry </h1>
      <Counter />
      <img className="inputImage" src="/mv_2020_10_512.png" />
      <canvas className="inputImageCanvas" width={500} height={500} onClick={onClickHandler} />
      <svg width={500} height={500}>
        <circle fill="red" r={50} cx={200} cy={200} />
      </svg>
    </div>
  );
}

export default App;
