import AWS from 'aws-sdk';
import config from "config";

const s3 = new AWS.S3({
  region: 'ap-southeast-1',
  accessKeyId: config.get("aws.accessKeyId"),
  secretAccessKey: config.get("aws.secretAccessKey"),
});

const BUCKET = "shootsta";

class AWSS3 {
  public async listAllKeys() {
    return new Promise((resolve, reject) => {
      const s3params = {
        Bucket: BUCKET,
        MaxKeys: 20,
        Delimiter: '/',
        Prefix: "videos/"
      };

      s3.listObjectsV2(s3params, (err, data) => {
        if (err) reject(err);
        resolve(data.Contents);
      });
    });
  }
  public async uploadFile(binaryFile: any, fileId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // Upload file on S3
      const params = {
        Body: binaryFile,
        Bucket: BUCKET,
        Key: `videos/${fileId}`
      };
      s3.putObject(params, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
}

export = AWSS3;