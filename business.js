const persistence = require('./persistence')

/**
 * Find a user by username and password.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object|null>} Returns the user object if found, otherwise null.
 */
async function findUser(username, password) {
  const users = await persistence.loadJson('users.json')
  for (let u of users) {
    if (u.username === username && u.password === password) return u
  }
  return null
}
/**
 * Get a photo by its ID.
 * @param {number|string} id - The ID of the photo.
 * @returns {Promise<Object|null>} Returns the photo object if found, otherwise null.
 */
async function getPhotoById(id) {
  const photos = await persistence.loadJson('photos.json')
  return photos.find(p => p.id === id) || null
}
/**
 * Update the title and/or description of a photo.
 * @param {number|string} id - The ID of the photo.
 * @param {number|string} userId - The ID of the user attempting the update.
 * @param {string} [title] - The new title (optional).
 * @param {string} [description] - The new description (optional).
 * @returns {Promise<boolean>} Returns true if update was successful, otherwise false.
 */
async function updatePhoto(id, userId, title, description) {
  const photos = await persistence.loadJson('photos.json')
  const photo = photos.find(p => p.id === id)
  if (!photo || photo.owner !== userId) return false
  if (title) photo.title = title
  if (description) photo.description = description
  await persistence.saveJson('photos.json', photos)
  return true
}
/**
 * Add a tag to a photo.
 * @param {number|string} id - The ID of the photo.
 * @param {number|string} userId - The ID of the user adding the tag.
 * @param {string} tag - The tag to add.
 * @returns {Promise<boolean>} Returns true if tag was added, otherwise false.
 */
async function addTag(id, userId, tag) {
  const photos = await persistence.loadJson('photos.json')
  const photo = photos.find(p => p.id === id)
  if (!photo || photo.owner !== userId) return false
  if (!photo.tags) photo.tags = []
  if (photo.tags.some(t => t.toLowerCase() === tag.toLowerCase())) return false
  photo.tags.push(tag)
  await persistence.saveJson('photos.json', photos)
  return true
}

module.exports = { findUser, getPhotoById, updatePhoto, addTag }
