/**
 * Digital Media Catalog CLI
 * Simple command-line app to find and edit photos.
 */
const promptSync = require('prompt-sync')
const prompt = promptSync({ sigint: true })
const business = require('./business')

/**
 * Main entry point for the CLI.
 * Prompts user to log in, then shows a menu to find, update, or tag photos.
 * Keeps running until the user chooses Exit.
 * @async
 * @returns {Promise<void>}
 */

async function main() {
  console.log('Digital Media Catalog')
  const username = prompt('Username: ')
  const password = prompt('Password: ')
  const user = await business.findUser(username, password)
  if (!user) {
    console.log('Invalid login')
    return
  }

  while (true) {
    console.log('\n1. Find Photo\n2. Update Photo\n3. Add Tag\n4. Exit')
    const choice = prompt('Select: ')
    if (choice === '1') {
      const id = parseInt(prompt('Photo ID: '))
      const photo = await business.getPhotoById(id)
      if (!photo) console.log('Not found')
      else if (photo.owner !== user.id) console.log('No access')
      else console.log(photo)

    } else if (choice === '2') {
      const id = parseInt(prompt('Photo ID: '))
      const title = prompt('New title: ')
      const desc = prompt('New description: ')
      const ok = await business.updatePhoto(id, user.id, title, desc)
      console.log(ok ? 'Updated' : 'Not allowed')

    } else if (choice === '3') {
      const id = parseInt(prompt('Photo ID: '))
      const tag = prompt('Tag: ')
      const ok = await business.addTag(id, user.id, tag)
      console.log(ok ? 'Tag added' : 'Not allowed')
 
    } else if (choice === '4') {
      console.log('Goodbye')
      break
    } else console.log('Invalid')
  }
}

main()
