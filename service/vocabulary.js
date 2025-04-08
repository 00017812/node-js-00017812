const FileSystem = require('fs')
const path = require('path')
if (!global.mock_db) {
    global.mock_db = path.join(__dirname, '../data', 'mock_db.json')
}

const vocabulary = require(global.mock_db)
const vocabularyService = {
    get(req, res) {
        return vocabulary;
    },
    getById(req, res) {
        const id = req.prams.id
        return vocabulary.find(item => item.id === id)
    },
    insert(req,res) {
        let new_id = genRandId(5)
        const body = req.body;
        const entry = {
            word: body.word,
            translation: body.translation,
            image: body.image,
            dateofadding: Date().toISOString()
        }
        vocabulary.push ({
            id: new_id,
            ...entry 
          });
          writeToFile(vocabulary);
          return {
            id: new_id,
            ...entry // Return the new entry with its ID
          };
    },
    update(req, res) {
        const id = req.params.id;
        const index = vocabulary.findIndex(item => item.id === id);
        if (index === -1) {
          return null; // Entry not found
        }
        // Update the vocabulary entry data
        vocabulary[index] = {
          id: id, // Keep the same ID
          word: req.body.word,
          translation: req.body.translation,
          image: req.body.image,
          dateAdded: vocabulary[index].dateAdded // Keep the original dateAdded
        };
        writeToFile(vocabulary); // Save changes to file
        return vocabulary[index]; // Return updated entry
    },
    
      // delete a vocabulary entry
    delete(req, res) {
        const id = req.params.id;
        const index = vocabulary.findIndex(item => item.id === id);
        if (index === -1) {
          return false; // Entry not found
        }
        vocabulary.splice(index, 1); // Remove entry from array
        writeToFile(vocabulary); // Save changes to file
        return true; // Indicate success
    }
}

let writeToFile = async (vocabulary) => {
    await fileSystem.writeFileSync(
      global.mock_db,
      JSON.stringify(vocabulary, null, 4),
      'utf8'
    );
  };
  
  // Generate a random ID (similar to a simplified UUID)
  let genRandId = (count) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < count; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  
  module.exports = vocabularyService;