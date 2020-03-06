import * as request from "request-promise-native";
import config from "config";
import log4js from "log4js";
const logger = log4js.getLogger("info");

// import vendors
import AWSS3 from "../../../vendors/aws-s3";

// import schemas
import Videos from "../../../schemas/videos";

/**
 * @module video-queries.ts
 * @description Module used for calling video queries.
 * @author Kelvin John Santos
 * @version 1.0
 * @since February 12, 2020
 */
class VideoQueries {
  public async listVideos() {
    logger.info("Called listVideos");
    try {
      const awsS3 = new AWSS3();
      return await awsS3.listAllKeys();
    } catch (error) {
      logger.error("There is something wrong while listing videos", error);
      return Promise.reject(error);
    }
  }
  public async listVideosFromDb() {
    logger.info("Called listVideosFromDb");
    try {
      return await Videos.find({});
    } catch (error) {
      logger.error("There is something wrong while listing videos from db", error);
      return Promise.reject(error);
    }
  }
  // private async getFollowers(member: any) {
  //   try {
  //     const baseUrl = config.get("thirdPartyApi.github.githubApiBaseUrl");
  //     const options = {
  //       url: `${baseUrl}/users/${member.login}/followers`,
  //       method: "GET",
  //       headers: { "User-Agent": "kelvinsantos" },
  //       json: true
  //     };
  //     const followers = await request.get(options);
  //     return followers;
  //   } catch (error) {
  //     logger.error("There is something wrong while getting followers", error);
  //   }
  // }
  // private async getFollowing(member: any) {
  //   try {
  //     const baseUrl = config.get("thirdPartyApi.github.githubApiBaseUrl");
  //     const options = {
  //       url: `${baseUrl}/users/${member.login}/following`,
  //       method: "GET",
  //       headers: { "User-Agent": "kelvinsantos" },
  //       json: true
  //     };
  //     const following = await request.get(options);
  //     return following;
  //   } catch (error) {
  //     logger.error("There is something wrong while getting following", error);
  //     return Promise.reject(error);
  //   }
  // }
}

export = VideoQueries;