const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
console.log(req.body);
console.log(req.files);
res.json({ message: "Successfully uploaded files" });
}