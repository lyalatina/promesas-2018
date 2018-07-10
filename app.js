/*
//La firma es el nombre de la función, los parámetros y lo que retorna
function animateElement(element, start, target, duration){ //Retornará promesa con elemento
  element.style.left = start; 
  let counter = 0;
  const delta = (target - start)*40/duration; //delta es lo que se debe mover por cuadro
  return new Promise((resolve, reject)=>{ // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
      const loop = setInterval(()=>{ // toma una funcion y la repite cada ciertos milisegundos
          const current = start + counter++ * delta; //a acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
          element.style.left = current;
          if(start > target && current <= target){ // acá indicamos cuando queremos que finalize el moviento que seria alb llegar a target
              element.style.left = current;
              clearInterval(loop); // Acá se termina la promesa
              resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
          }else if(start < target && current >= target){
              element.style.left = current;
              clearInterval(loop); // Acá se termina la promesa
              resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
          }
      }, 40);// 40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
  });                
}
*/
function animateElement(element, start, end, duration) {
  return new Promise((resolve, reject) => { //resolve: Para completar promesas. reject: Para rechazarlas. (Como then y catch). NO SON PALABRAS RESERVADAS.
    const delta = (end - start) * 30 / duration; //Distancia que va a recorrer cada elemento x 40 (milisegundos) / duración 
    element.style.left = start; //start parte desde la izquierda
    let counter = 0;
    const loop = setInterval(() => { //función itineraria
      const currentPosition = start + delta * counter++;
      element.style.left = currentPosition;
      if (start < end && currentPosition >= end) {
        clearInterval(loop);
        resolve(); //Llama a then cuando termina la animación
      } else if (start > end && currentPosition <= end) {
        clearInterval(loop);
        resolve(); //Llama a then cuando termina la animación
      }
    }, 30);// ejecuta una funcion cada cierto tiempo
  });
}


// Somos programadoras de la promise
//===================== Promise ===================
// Somos las usuarias de la promise

//Secuencial

const allImg = document.getElementsByTagName("img");
/*animateElement(allLi[0], -200, 200, 4000).then(()=>{ // coordenadas fuera de la pantalla se indican con numeros negativos. Acá se está haciendo uso de la promesa por fuera.
  console.log("Terminó la animación de doge");
  return animateElement(allLi[1], -200, 200, 2000); //" cá tenemos una promesa anidada, es como decirle: hiciste esto, y ahora haz esto otro
}).then(()=>{ 
  console.log("Terminó de llegar el cate");
}).catch(()=>{
  console.log("Falló la animación");
}); */



//PARALELISMO
Promise.all([ //Las imágenes se mueven de izquierda a derecha
  animateElement(allImg[0], 0, 1200, 3000),
  animateElement(allImg[1], 0, 1200, 6000)
]).then(() => {
  console.log("Terminaron AMBAS animaciones");
  return Promise.all([ //Retornar promesa que se ejecutará en el próximo then
    //Las imágenes se mueven de derecha a izquierda
    animateElement(allImg[0], 600, -200, 3000),
    animateElement(allImg[1], 600, -200, 6000)
  ]);
}).then(() => {

  console.log("Doge y cate se devolvieron");
}).catch(() => {

});