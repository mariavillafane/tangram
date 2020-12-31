import { range } from './utils';

export function vec(x,y) {
  return {
    x:x, 
    y:y
  };
}
  
export function addVec(a, b) {
  //add a + b ; a,b == vec
  return vec(a.x + b.x, a.y + b.y)
}
  
export  function multiplyVec(a, scalar){
  //multiply a * scalar
  return vec(a.x * scalar, a.y * scalar)  
}
  
export function subVec(a,b) {
  //subtract a - b ; a,b == vec
  return vec(a.x - b.x, a.y - b.y)
}
  
export function lenVec(a) {
  //get length of a ; a == vec
  return Math.sqrt(a.x*a.x, a.y*a.y)
}
  
export function getStepSize(c) {
  //get amount of unitary steps along length of vec c (vector from a, to b), c == vec
  return 1.0 / Math.max(c.x,c.y)  
}
  
export function getSteps(c) {
  return Math.max(c.x,c.y)  
}
  
export function triangle(a,b,c){
  return{
    a:a,
    b:b, 
    c:c
  }
}  
  

export function roundVec(c){
  return vec(Math.round(c.x), Math.round(c.y))
}


export function* rasteriseTriangle(triangle){
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