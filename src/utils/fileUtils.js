import fs from "fs";

/**
 * lee y devuelve el contenido de un archivo como texto en 'utf-8'
 * @param {string} ruta relativa al directorio del proyecto
 * @return {string} el texto leído
 */
function leerArchivoComoString(ruta) {
  return fs.readFileSync(ruta, "utf-8");
}

/**
 * escribe el texto en el archivo de la ruta, sólo si tal archivo existe. sino, lanza error.
 * @param {string} ruta relativa al directorio del proyecto
 * @param {string} texto
 * @param {boolean} shouldCreateIfNotExists si el archivo no existe, indica si hay que crearlo
 */
function escribirTextoEnArchivo(ruta, texto, shouldCreateIfNotExists) {
  const existe = fs.existsSync(ruta);

  if (!existe && !shouldCreateIfNotExists) {
    throw new Error("el archivo no existe");
  }

  // fs.writeFileSync crea el archivo automáticamente si no existe
  fs.writeFileSync(ruta, texto, "utf-8");
}

export { leerArchivoComoString, escribirTextoEnArchivo };
