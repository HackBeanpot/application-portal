import { Storage } from '@google-cloud/storage';

/**
 * Uploads some content to a google cloud storage bucket
 * @param bucketName name of google cloud storage bucket to upload to
 * @param content content to upload
 * @param destinationFileName id for file in google cloud storage
 */
export async function uploadFile(
  bucketName: string,
  content: string,
  destinationFileName: string
): Promise<void> {
  const storage = new Storage();
  await storage.bucket(bucketName).file(destinationFileName).save(content);

  console.log(`${destinationFileName} with contents ${content} uploaded to ${bucketName}.`);
}
