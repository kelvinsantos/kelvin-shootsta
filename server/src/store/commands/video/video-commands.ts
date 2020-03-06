import * as request from "request-promise-native";
import config from "config";
import log4js from "log4js";
const logger = log4js.getLogger("info");

// import vendors
import AWSS3 from "../../../vendors/aws-s3";

// import schemas
import Videos from "../../../schemas/videos";

/**
 * @module video-commands.ts
 * @description Module used for calling video commands.
 * @author Kelvin John Santos
 * @version 1.0
 * @since February 12, 2020
 */
class VideoCommands {
  public async uploadVideo(fileBinary: any, fileName: any, thumbnail: any) {
    logger.info("Called uploadVideo");
    try {
      const awsS3 = new AWSS3();
      const s3UploadFileResponse = await awsS3.uploadFile(fileBinary, fileName);
      const newVideo = new Videos({
        key: fileName,
        etag: s3UploadFileResponse.ETag.replace(/\"/g, ""),
        thumbnail
      });
      return newVideo.save();
    } catch (error) {
      logger.error("There is something wrong while uploading videos", error);
      return Promise.reject(error);
    }
  }
}

export = VideoCommands;