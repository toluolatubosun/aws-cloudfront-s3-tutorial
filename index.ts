import ms from 'ms';
import dayjs from 'dayjs';
import dotenv from 'dotenv';
import { getSignedUrl as getSignedCloudfrontUrl } from "@aws-sdk/cloudfront-signer";

dotenv.config();

const CLOUDFRONT_KEY_PAIR_ID = process.env.CLOUDFRONT_KEY_PAIR_ID!;
const CLOUDFRONT_PRIVATE_KEY = process.env.CLOUDFRONT_PRIVATE_KEY!.replace(/\\n/g, '\n');

interface GetSignedCloudfrontUrlData {
    cloudfrontDomain: string;
    expiresInSeconds: number;
    s3fileKey: string;
}

const generateCloudfrontSignedUrl = ({ cloudfrontDomain, expiresInSeconds, s3fileKey }: GetSignedCloudfrontUrlData) => {
    const params = {
        url: `${cloudfrontDomain}/${s3fileKey}`,
        keyPairId: CLOUDFRONT_KEY_PAIR_ID,
        privateKey: CLOUDFRONT_PRIVATE_KEY,
        dateLessThan: dayjs().add(expiresInSeconds ?? ms("5h") / 1000, "seconds").toISOString(),
    };

    try {
        const url = getSignedCloudfrontUrl({ ...params });
      
        return { url };
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

const result = generateCloudfrontSignedUrl({
    s3fileKey: "private/img-QJZjkvXR2eckuDvYifJtIlr4.png",
    expiresInSeconds: ms("5h") / 1000,
    cloudfrontDomain: "https://d1c89x7lvtgs5h.cloudfront.net",
});
console.log(result);