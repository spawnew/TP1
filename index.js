import {leerArchivoComoString,escribirTextoEnArchivo,} from "./src/utils/fileUtils.js";
import {transformarStringEnArrayDeNumeros,transformarArrayDeNumerosAUnSoloString,} from "./src/utils/transformUtils.js";
import { combinarDosArrays, combinarNArrays } from "./src/apareo.js";

const SEPARADOR = ",";

const RUTA_A = "./in/10NumerosOrdenadosEntre1y50(setA).in";
const RUTA_B = "./in/10NumerosOrdenadosEntre1y50(setB).in";
const RUTA_IMPARES = "./in/imparesOrdenadosEntre1y999.in";
const RUTA_PARES = "./in/paresOrdenadosEntre2y1000.in";

const RUTA_COMBINADO = "./out/combinado.out";
const RUTA_COMBINADO2 = "./out/combinado2.out";

try {
  // leo los 4 archivos a memoria
  const textoA = leerArchivoComoString(RUTA_A);
  const textoB = leerArchivoComoString(RUTA_B);
  const textoImpares = leerArchivoComoString(RUTA_IMPARES);
  const textoPares = leerArchivoComoString(RUTA_PARES);

  // preparo los 4 arrays a partir de los archivos leidos
  const arrA = transformarStringEnArrayDeNumeros(textoA, SEPARADOR);
  const arrB = transformarStringEnArrayDeNumeros(textoB, SEPARADOR);
  const arrImpares = transformarStringEnArrayDeNumeros(textoImpares, SEPARADOR);
  const arrPares = transformarStringEnArrayDeNumeros(textoPares, SEPARADOR);

  // combino los primeros dos arrays
  const combinadoAB = combinarDosArrays(arrA, arrB);
  const textoCombinadoAB = transformarArrayDeNumerosAUnSoloString(
    combinadoAB,
    SEPARADOR,
  );
  escribirTextoEnArchivo(RUTA_COMBINADO, textoCombinadoAB, true);
  console.log(`combinarDosArrays -> ${RUTA_COMBINADO}`);
  console.log(textoCombinadoAB);

  // combino los cuatro arrays
  const combinadoTodos = combinarNArrays([arrA, arrB, arrImpares, arrPares]);
  const textoCombinadoTodos = transformarArrayDeNumerosAUnSoloString(
    combinadoTodos,
    SEPARADOR,
  );
  escribirTextoEnArchivo(RUTA_COMBINADO2, textoCombinadoTodos, true);
  console.log(`\ncombinarNArrays -> ${RUTA_COMBINADO2}`);
  console.log(textoCombinadoTodos);
} catch (error) {
  console.error("Error en la ejecución:", error.message);
  process.exitCode = 1;
}
