import 'mocha';
import { expect } from 'chai';
import sinon from "sinon";

// import queries
import VideoQueries from "../../../src/store/queries/video/video-queries";

// Test variables
let sandbox: sinon.SinonSandbox;
let videoQueries: VideoQueries;

describe('video-queries.spec.ts', () => { 
    beforeEach(() => {
      sandbox = sinon.createSandbox();

      videoQueries = new VideoQueries();
      sinon.stub(videoQueries, "listVideos").resolves({});
      sinon.stub(videoQueries, "listVideosFromDb").resolves();
    });

    afterEach(() => {
      sandbox.restore();
    })

    it('list videos from s3', async () => {
      let videos = await videoQueries.listVideos();

      expect(videos).to.not.null;
    });

    it('list videos from database', async () => {
      let videos = await videoQueries.listVideosFromDb();

      expect(videos).to.be.undefined;
    });
});