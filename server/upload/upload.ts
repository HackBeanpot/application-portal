import { Storage, SaveOptions } from '@google-cloud/storage';

/**
 * Uploads some content to a google cloud storage bucket
 * @param bucketName name of google cloud storage bucket to upload to
 * @param content content to upload
 * @param destinationFileName id for file in google cloud storage
 */
async function uploadFile(
  bucketName: string,
  content: Buffer,
  fileOptions: SaveOptions,
  destinationFileName: string
): Promise<void> {
  const storage = new Storage();
  await storage
    .bucket(bucketName)
    .file(destinationFileName)
    .save(content, fileOptions)
    .catch((e) => console.error('Error while uploading to google cloud storage:', e));
}

/**
 * Uploads PDFs to the google cloud bucket assigned to resumes
 * @param content pdf data in a buffer
 * @param destinationFileName id for file in google cloud storage
 * @returns whether the upload was successful or not
 */
export function uploadApplicantResume(content: Buffer, destinationFileName: string): void {
  let bucketName = process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET;
  if (process.env.NODE_ENV !== 'production') {
    bucketName = process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET_TEST;
  }
  if (!bucketName) {
    console.log('env variable for resume upload to google cloud storage undefined!');
  } else {
    const fileOptions: SaveOptions = {
      contentType: 'application/pdf',
    };
    uploadFile(bucketName, content, fileOptions, destinationFileName);
  }
}
