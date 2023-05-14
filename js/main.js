let tam=5;
function formatear(){
    let it=0;
    let cajas=document.querySelectorAll('.caja');
    for(let i=0;i<tam;i++){
        for(let j=0;j<tam;j++){
            if(i==j) cajas[it].value=0;
            it++;
        }
    }
}
formatear();
function generarMatriz() {
   
   let matriz=new Array(tam);
   for(let i=0;i<matriz.length;i++){
       matriz[i]=new Array(tam);
   }
   let it=0;
   let cajas=document.querySelectorAll('.caja');
   for(let i=0;i<tam;i++){
       for(let j=0;j<tam;j++){
           matriz[i][j]=parseInt(cajas[it].value);
           it++;
       }
   }
    return matriz;
}

const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

function getCombinaciones(_num) {
    let num = _num - 1;
    let arrNum = [];
    for (let i = 0; i < num; i++) {
        arrNum.push(i);
    }
    let arraux = permutator(arrNum);
    let fil = arraux.length;
    let col = arraux[0].length + 2;
    let matriz = new Array(fil);
    for (let i = 0; i < fil; i++) {
        matriz[i] = new Array(col);
    }

    for (let i = 0; i < fil; i++) {
        matriz[i][0] = num;
        matriz[i][col - 1] = num;
        for (let j = 1; j < col - 1; j++) {
            matriz[i][j] = arraux[i][j - 1];
        }
    }
    return matriz;
}
function letra(numero) {
    let letras=['A','B','C','D','E'];

    return letras[numero];
}
function cortado(cadena){
    let nuevo=[];
    nuevo.push(cadena[0]);
    for(let i=1; i<cadena.length-1;i++){
        if(i%2!=0) nuevo.push(cadena[i]);
    }
    nuevo.push(cadena[cadena.length-1]);
    return nuevo;
}
function caminoMinimo() {
    let caminos = [];
    let matriz = generarMatriz();
    let tam = matriz.length;
    let combinacion = getCombinaciones(tam);

    let cont = 0;
    let cant = getCombinaciones(tam).length;
    let suma = new Array(cant);
    let k = 0;
    for (let l = 0; l < cant; l++) {
        let cadena = "";
        while (k < tam) {

            for (let i = 0; i < tam; i++) {
                for (let j = 0; j < tam; j++) {
                    try {
                        if (i == combinacion[l][k] && j == combinacion[l][k + 1]) {
                            if (matriz[i][j] == 0) cont += 99;
                            else {
                                cont += matriz[i][j];
                                cadena += (letra(i) + "" + letra(j));
                            }
                            k++;
                        }
                    } catch {
                        break;
                    }
                }
            }
        }
        caminos.push(cadena);
        k = 0;
        suma[l] = cont;
        cont = 0;
    }
    let menor = 9999;
    let posMinimo;
    for (let i = 0; i < cant; i++) {
        if (suma[i] < menor) {
            menor = suma[i];
            posMinimo = i;
        }
    }
    let txtrecorrido = document.querySelector('.Recorrido');
    let txtcamino = document.querySelector('.caminoMinimo');
    let cad = caminos[posMinimo];

    if(menor<9999){
        txtrecorrido.textContent = 'Camino mas corto: ' + cortado(cad);
        txtcamino.textContent = 'Longitud: ' + menor;
    }else{
        txtrecorrido.textContent = 'Camino mas corto: <Error>' ;
        txtcamino.textContent = 'Longitud: <Error>' ;
    }
}

window.addEventListener('input',()=>{
    let cajas=document.querySelectorAll('.caja');
    for(let i=0;i<tam;i++){
        for(let j=0;j<tam;j++){   
            cajas[tam*i+j].addEventListener('input',()=>{
                console.log("Presionando..");
                cajas[tam*j+i].value=cajas[tam*i+j].value;
            })        
        }
    }
})

//[4;1][1;3][3;0][0;2][2;4]