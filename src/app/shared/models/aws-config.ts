export const awsconfig = {
  'access_key': 'AKIAJMCABHZAM46YVF6A', // AWS Key
  'secret_access_key': '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', // AWS Secret
  'bucket_name': 'vntc-xrays', // S3 bucket
  'region': 'ap-northeast-2',
  'identity_pool': 'ap-northeast-2:001e6d38-2de0-4268-8145-89016144b9c6',
  // redirect_host = "http://localhost:3000/", // Redirect page after successful upload
  // 'host': "YOUR_S3_PROVIDER", // S3 provider host
  // 'bucket_dir': "uploads/", // Subdirectory in S3 bucket where uploads will go
  // 'max_filesize': 20971520 // Max filesize in bytes (default 20MB)
}

export interface AwsUploadResponse {
  'success': boolean,
  'file': string
}