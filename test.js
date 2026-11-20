import assert from 'node:assert/strict';
import { leerArchivoComoString, escribirTextoEnArchivo } from './src/utils/fileUtils.js';
import {
  transformarStringEnArrayDeNumeros,
  transformarArrayDeNumerosAUnSoloString,
} from './src/utils/transformUtils.js';
import { combinarDosArrays, combinarNArrays } from './src/apareo.js';

function test(nombre, fn) {
  try {
    fn();
    console.log(`✔ ${nombre}`);
  } catch (error) {
    console.error(`✘ ${nombre}`);
    throw error;
  }
}

test('transformarStringEnArrayDeNumeros descarta fragmentos no numéricos', () => {
  const resultado = transformarStringEnArrayDeNumeros('123 | 456 | 789 | 1bc | 10', ' | ');
  assert.deepEqual(resultado, [123, 456, 789, 10]);
});

test('transformarArrayDeNumerosAUnSoloString concatena con separador', () => {
  const resultado = transformarArrayDeNumerosAUnSoloString([123, 456, 789, 10], ',');
  assert.equal(resultado, '123,456,789,10');
});

test('combinarDosArrays combina sin ordenar y sin repetidos', () => {
  const resultado = combinarDosArrays([1, 5, 10], [2, 3, 8, 11]);
  assert.deepEqual(resultado, [1, 2, 3, 5, 8, 10, 11]);
});

test('combinarNArrays combina varios arrays sin repetidos', () => {
  const resultado = combinarNArrays([[1, 10], [2, 3, 15, 16], [4], [6, 7, 13]]);
  assert.deepEqual(resultado, [1, 2, 3, 4, 6, 7, 10, 13, 15, 16]);
});

test('escribirTextoEnArchivo lanza error si no existe y el flag es false', () => {
  assert.throws(
    () => escribirTextoEnArchivo('./in/no-existe-esto.tmp', 'hola', false),
    /el archivo no existe/,
  );
});

test('combinarDosArrays sobre los archivos de datos provistos coincide con combinado.out', () => {
  const textoA = leerArchivoComoString('./in/10NumerosOrdenadosEntre1y50(setA).in');
  const textoB = leerArchivoComoString('./in/10NumerosOrdenadosEntre1y50(setB).in');
  const esperado = leerArchivoComoString('./out/combinado.out');

  const arrA = transformarStringEnArrayDeNumeros(textoA, ',');
  const arrB = transformarStringEnArrayDeNumeros(textoB, ',');
  const combinado = combinarDosArrays(arrA, arrB);
  const texto = transformarArrayDeNumerosAUnSoloString(combinado, ',');

  assert.equal(texto.trim(), esperado.trim());
});

test('combinarNArrays sobre los 4 archivos de datos provistos coincide con combinado2.out', () => {
  const rutas = [
    './in/10NumerosOrdenadosEntre1y50(setA).in',
    './in/10NumerosOrdenadosEntre1y50(setB).in',
    './in/imparesOrdenadosEntre1y999.in',
    './in/paresOrdenadosEntre2y1000.in',
  ];
  const esperado = leerArchivoComoString('./out/combinado2.out');

  const arrs = rutas.map((ruta) => transformarStringEnArrayDeNumeros(leerArchivoComoString(ruta), ','));
  const combinado = combinarNArrays(arrs);
  const texto = transformarArrayDeNumerosAUnSoloString(combinado, ',');

  assert.equal(texto.trim(), esperado.trim());
});

console.log('\nTodos los tests pasaron');