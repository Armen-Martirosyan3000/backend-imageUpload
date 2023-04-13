// when we have a website and a user on the website wants to upload a picture-երբ ունենք կայք և կայքում օգտագործողը ցանկանում է նկար ներբեռնել, նեևբեռնած նկարը մուտք է լինում images պապկայի մեջ
const express = require('express');
const multer = require('multer');//Multer-ը node.js-ի middleware ֆունկցիա է,որը հիմնականում օգտագործվում է ֆայլեր վերբեռնելու համար: 
const fs = require('fs');//Node FS-ը նշանակում է NodeJS File System մոդուլ,Node FS Module-ն ապահովում է API՝ Ֆայլային համակարգի հետ փոխազդելու և որոշ IO գործողություններ կատարելու համար, ինչպիսիք են ֆայլի ստեղծումը, Ֆայլի ընթերցումը, ֆայլի ջնջումը, ֆայլի թարմացումը և այլն:
const app = express();
const PORT = 3000;


app.use(express.static('public'));

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) { //destination(նպատակակետը)-ը './images' պապկան է
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //այստեղով պահպանվում է ֆայլի օրիգինալ անվանումը
  }
})

const upload = multer({ storage: storage2 })

app.post('/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
    res.json(req.file);
  }
  else throw 'error';
});

app.get('/images/:name', (req, res) => {
  const image_name = req.params.name
  fs.readFile(`./images/${image_name}`, function (err, data) {
    if (err) throw err;
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(data);
  });
})

app.listen(PORT, () => {
  console.log('Listening at ' + PORT);
});