const fs = require('fs');
const path = require('path');

if (!global.mock_db) {
    global.mock_db = path.join(__dirname, '../data', 'mock_db.json');
}

let vocabulary = require(global.mock_db);

const vocabularyService = {
    get(req, res) {
        return vocabulary;
    },
    getById(req, res) {
      const id = req.params.id;
      const item = vocabulary.find(item => item.id === id);
      if (!item) {
          return res.status(404).json({ error: 'Item not found' });
      }
      return res.json(item);
  },
  insert(req, res) {
    let new_id = genRandId(5);
    const body = req.body;
    const entry = {
        word: body.word,
        translation: body.translation,
        image: body.image,
        dateofadding: new Date().toISOString() 
    };
    vocabulary.push({
        id: new_id,
        ...entry 
    });
    writeToFile(vocabulary);
    return res.status(201).json({ id: new_id, ...entry }); 
},
update(req, res) {
  const id = req.params.id;
  const index = vocabulary.findIndex(item => item.id === id);
  if (index === -1) {
    return null; 
  }
  vocabulary[index] = {
    id: id, 
    word: req.body.word,
    translation: req.body.translation,
    image: req.body.image,
    dateofadding: vocabulary[index].dateofadding 
  };
  writeToFile(vocabulary); 
  return vocabulary[index]; 
},
    delete(req, res) {
    const id = req.params.id;
    const index = vocabulary.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    
    vocabulary.splice(index, 1); 
    writeToFile(vocabulary); 
    return res.status(204).send(); 
}
};


let writeToFile = (vocabulary) => {
    fs.writeFileSync(global.mock_db, JSON.stringify(vocabulary, null, 4), 'utf8');
};

let genRandId = (count) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

module.exports = vocabularyService;