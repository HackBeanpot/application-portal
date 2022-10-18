import { Storage } from '@google-cloud/storage';

/**
 * Uploads some content to a google cloud storage bucket
 * @param bucketName name of google cloud storage bucket to upload to
 * @param content content to upload
 * @param destinationFileName id for file in google cloud storage
 */
async function uploadFile(
  bucketName: string,
  content: string,
  destinationFileName: string
): Promise<void> {
  const storage = new Storage();
  await storage
    .bucket(bucketName)
    .file(destinationFileName)
    .save(content)
    .catch((e) => console.error('Error while uploading to google cloud storage:', e));
}

/**
 * Uploads content to the google cloud bucket assigned to resumes
 * @param content content
 * @param destinationFileName id for file in google cloud storage
 * @returns whether the upload was successful or not
 */
export function uploadApplicantResume(content: string, destinationFileName: string): void {
  let bucketName = process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET;
  if (process.env.NODE_ENV !== 'production') {
    bucketName = process.env.GOOGLE_CLOUD_STORAGE_RESUME_BUCKET_TEST;
  }
  if (!bucketName) {
    console.log('env variable for resume upload to google cloud storage undefined!');
  } else {
    uploadFile(bucketName, content, destinationFileName);
  }
}
