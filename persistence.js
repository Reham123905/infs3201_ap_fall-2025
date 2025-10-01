const fs = require('fs/promises')
/**
 * Asynchronously reads a JSON file and parses it into an object.
 * @async
 * @param {string} path - The file path to the JSON file.
 * @returns {Promise<Object>} A promise that resolves to the parsed object.
 */
async function loadJson(path) {
  const text = await fs.readFile(path, 'utf8')
  return JSON.parse(text)
}
/**
 * Asynchronously saves an object as a JSON file.
 * @async
 * @param {string} path - The file path to save the data.
 * @param {Object} data - The object to save.
 * @returns {Promise<void>} A promise that resolves when the file is written.
 */
async function saveJson(path, data) {
  const text = JSON.stringify(data, null, 2)
  await fs.writeFile(path, text, 'utf8')
}

module.exports = { loadJson, saveJson }
