const aws = require("aws-sdk");
const config = require("../config/env/development.json");
const crypto = require("crypto");

const region = "us-east-1";
const bucketName = "images-bisell";
const accessKeyId = config.s3.ACCESS_KEY;
const secretAccessKey = config.s3.SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

exports.generateUploadURL = async function () {
  const randomBytes = await crypto.randomBytes(16);
  const imageName = randomBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
  return uploadUrl;
};
