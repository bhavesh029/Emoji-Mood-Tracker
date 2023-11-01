import { FileInfo } from './models/file-info';

export abstract class PlatformUtils {
  abstract generateAwsS3Url(params: FileInfo): string;
  abstract generateBaseAsUrl(): string;
  abstract generateBucketAndRegion(): string[];
}
