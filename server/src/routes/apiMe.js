const express = require('express');
const router = express.Router();
const meController = require('../controllers/meController');
const multer = require('multer');

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now());
	},
});
const upload = multer({ storage });

router.post('/post', upload.single('file'), meController.meAddPost);

module.exports = router;
