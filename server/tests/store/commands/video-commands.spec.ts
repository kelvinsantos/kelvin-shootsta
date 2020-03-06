import 'mocha';
import { expect } from 'chai';
import sinon from "sinon";

// import commands
import VideoCommands from "../../../src/store/commands/video/video-commands";

// Test variables
let sandbox: sinon.SinonSandbox;
let videoCommands: VideoCommands;

describe('video-commands.spec.ts', () => { 
    beforeEach(() => {
      sandbox = sinon.createSandbox();

      videoCommands = new VideoCommands();
      sinon.stub(videoCommands, "uploadVideo").resolves();
    });

    afterEach(() => {
      sandbox.restore();
    })

    it('upload video should return', async () => {
      const fileBinary = "";
      const fileName = "";
      const thumbnail = "";
      let response = await videoCommands.uploadVideo(fileBinary, fileName, thumbnail);

      expect(response).to.be.undefined;
    });
});