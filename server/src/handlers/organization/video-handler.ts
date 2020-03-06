import { Request, Response, NextFunction } from "express";

// import commands
import VideoCommands from "../../store/commands/video/video-commands";

// import queries
import VideoQueries from "../../store/queries/video/video-queries";

/**
 * @module video-handler.ts
 * @description Module used for creating api handlers.
 * @author Kelvin John Santos
 * @version 1.0
 * @since February 12, 2020
 */
class VideoHandler {
  public async get(req: Request, res: Response, next: NextFunction) {
    const videoQuery = new VideoQueries();
    videoQuery.listVideos().then(videos => {
      return res.status(200).json(videos);
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
  public async getFromDb(req: Request, res: Response, next: NextFunction) {
    const videoQuery = new VideoQueries();
    videoQuery.listVideosFromDb().then(videos => {
      return res.status(200).json(videos);
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
  public async upload(req: Request, res: Response, next: NextFunction) {
    // tslint:disable-next-line:no-console
    console.log("req.file::", req.file);

    const fileBinary = req.file.buffer;
    const fileName = req.file.originalname;
    const thumbnail = req.body.thumbnail;

    // const input: InsertVideoRequest = {}
    const videoCommand = new VideoCommands();
    await videoCommand.uploadVideo(fileBinary, fileName, thumbnail).then(response => {
      return res.status(200).json(response);
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
}

export = VideoHandler;