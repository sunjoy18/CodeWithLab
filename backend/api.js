const express = require('express');
const axios = require('axios');

const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const app = express();
// const port = 3001;
app.use(bodyParser.json());
router.use(cors());

router.use(express.json());

const languageFileExtensions = {
  ats: 'dats',
  bash: 'sh',
  c: 'c',
  cpp: 'cpp',
  csharp: 'cs',
  clojure: 'clj',
  cobol: 'cob',
  coffeescript: 'coffee',
  crystal: 'cr',
  d: 'd',
  dart: 'dart',
  elixir: 'ex',
  elm: 'elm',
  erlang: 'erl',
  fsharp: 'fs',
  go: 'go',
  groovy: 'groovy',
  guile: 'scm',
  haskell: 'hs',
  idris: 'idr',
  java: 'java',
  javascript: 'js',
  julia: 'jl',
  kotlin: 'kt',
  lua: 'lua',
  mercury: 'm',
  nim: 'nim',
  nix: 'nix',
  ocaml: 'ml',
  perl: 'pl',
  php: 'php',
  plaintext: 'txt',
  python: 'py',
  raku: 'raku',
  ruby: 'rb',
  rust: 'rs',
  sac: 'sac',
  scala: 'scala',
  swift: 'swift',
  typescript: 'ts',
  vb: 'vb',
  zig: 'zig',
};


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/run-code', upload.single('file'), async (req, res) => {
  const { language, input, code } = req.body;

  const glotAPI = 'https://glot.io/api/run/';
  const apiKey = 'e7110d7a-a6ad-4c45-aadd-4321f7e291d8'; // Replace with your Glot API key

  let requestData;

  if (req.file) {
    requestData = {
      files: [
        {
          name: req.file.originalname,
          content: req.file.buffer.toString(),
        },
      ],
      stdin: input,
    };
  } else {
    requestData = {
      files: [
        {
          name: `main.${languageFileExtensions[language.toLowerCase()]}`,
          content: code,
        },
      ],
      stdin: input,
    };
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${apiKey}`,
  };

  try {
    const response = await axios.post(`${glotAPI}${language}/latest`, requestData, { headers });
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Error:', error.response.data);
      res.status(500).json({ error: error.response.data });
    } else {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

module.exports = router;