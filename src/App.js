import { useEffect, useState } from 'react'
import './App.css';
import { triangle, vec, drawAverageTriangles } from './maths/geometry';
import { to_image_data, to_image_matrix, slidingWindow } from './maths/utils';





function main(verticesOfTriangles) {
  const canvas = document.querySelector(".inputImageCanvas");
  const img = document.querySelector(".inputImage");

  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');  
  ctx.drawImage(img, 0, 0, img.width, img.height);

  console.log('main', verticesOfTriangles);
  const imageData = ctx.getImageData(0, 0, 512, 512);

  const imageMatrix = to_image_matrix(512, 4, imageData);
  //console.log(imageMatrix);

  const w_triangles = slidingWindow(3, verticesOfTriangles)
  console.log('w_triangles', w_triangles)
  //triangle part
  const triangles = w_triangles.map(tr => triangle(tr[0], tr[1], tr[2]));
  
  
  //const triangles = [triangle(vec(175,175), vec(175,200), vec(200,200)), triangle(vec(75,75), vec(75,100), vec(100,100))];
  
  drawAverageTriangles(triangles, imageMatrix);

  const imageDataAgain = to_image_data(imageMatrix);
  //console.log(imageDataAgain);

  const newImage = new ImageData(imageDataAgain, 512, 512);
  //const newImage = new ImageData(newImageData, 512, 512);
  ctx.putImageData(newImage, 0, 0);
     
}




function App() {
  const [verticesOfTriangles, setVarVerticesOfTr] = useState([]); //this initiates i=0  
  console.log('verticesOfTriangles = ', verticesOfTriangles);

  useEffect(()=>{
    const doSth = () => main(verticesOfTriangles);
    setTimeout(doSth);

    //setTimeout(() => main(verticesOfTriangles)); //this is equivalent to above
  }); //}, []); this is dependency array > reruns main if smth has changed  

  function onClickHandler(event) {
    const rect = event.target.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    console.log({x,y});

    setVarVerticesOfTr([...verticesOfTriangles, vec(x,y)])
  }

  
  // React.createElement('div', ...)
  return (
    <div className="App">
      <h1> Hello geometry </h1>
      <img className="inputImage" src="/mv_2020_10_512.png" />
      <canvas className="inputImageCanvas" width={500} height={500} onClick={onClickHandler} />
      <svg width={500} height={500}>
        <circle fill="red" r={50} cx={200} cy={200} />
      </svg>
    </div>
  );
}

export default App;
