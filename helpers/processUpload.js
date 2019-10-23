const cloudinary = require("cloudinary").v2;
const { UserInputError } = require("apollo-server-express");

module.exports = async (upload) => {
  const { createReadStream, mimetype } = await upload;

  let imageBoolean = false;

  switch (mimetype) {
    case "image/jpeg":
      imageBoolean = true;
      break;

    case "image/png":
      imageBoolean = true;
      break;

    default:
      imageBoolean = false;
  }

  if (!imageBoolean) {
    console.log(`here then ${mimetype}`);
    throw new UserInputError("Only .jpg and .png formats accepted");
  }

  const stream = createReadStream();

  cloudinary.config({
    cloud_name: "sameers-app",
    api_key: "973821294142252",
    api_secret: "LJ8OY_8KdY8uE7jHdNjmboMT4YY"
  });

  let resultUrl = "";

  const cloudinaryUpload = async ({ stream }) => {
    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.uploader.upload_stream(function(
          error,
          result
        ) {
          if (result) {
            console.log(result);
            resultUrl = result.secure_url;
            resolve(resultUrl);
          } else {
            reject(error);
          }
        });

        stream.pipe(streamLoad);
      });
    } catch (err) {
      throw new Error(`Failed to upload profile picture, Err:${err.message}`);
    }
  };

  await cloudinaryUpload({ stream });
  return { picUrl: resultUrl };
};
