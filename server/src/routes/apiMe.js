const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/meController');
const multer = require('multer');

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now());
	},
});
const upload = multer({ storage });

router.post('/post', upload.single('file'), meController.meAddPost);
router.put('/status', meController.updateStatus);
router.delete('/post', meController.deletePost);
router.get('/message', meController.getMessage);
router.get('/message/read-not-accpet', meController.ReadMessageNotAccpet);

module.exports = router;
