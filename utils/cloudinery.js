const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = async (filePath) => {
  try {
    if (!filePath) {
      return "could not find the file path";
    }
    //upload file on cloudinary
    const uploaded = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    //file upload successfully

    console.log("file upload successfully", uploaded.url);

    return uploaded;
  } catch (error) {
    fs.unlinkSync(filePath); //remove the locally saved temporary file as upload operation
  }
};

module.exports = uploadImage;
