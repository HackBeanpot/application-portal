import { NextApiHandler } from "next";
import { protect } from "../../../server/protect";
import { uploadFile } from "../../../server/upload/upload";


const handler: NextApiHandler = async (req, res) => {
  if (process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET) {
    console.log('uploading')
    uploadFile(process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET, 'TEST', 'test file').catch(console.error)
    res.send('passed through file upload code successfully')
  } else {
    console.error('env variable undefined')
  }
}

export default protect(handler);
