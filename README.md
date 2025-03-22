# CloudFront and S3 Bucket

This is a simple project to demonstrate how to setup a CloudFront distribution to serve files from an S3 bucket.

Watch the YouTube video to see how to set this up.

## Generate Key Pair
```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

## Put Private Key in One Line, to make it compatible with .env file
```bash
awk 'NF {sub(/\r/, ""); printf "%s\\n", $0;}' private_key.pem
```

## YouTube Video
![YouTube Video](https://www.youtube.com/watch?v=rNOi_WOdSMM)

## S3 Bucket Policy to Allow CloudFront Access
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::your-account-id:distribution/CLOUDFRONT_DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

## CORS Headers For S3 Bucket
```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "HEAD"
        ],
        "AllowedOrigins": [
            "http://localhost:3000",
            "https://toluolatubosun.com",
            "https://gaia.toluolatubosun.com"
        ],
        "ExposeHeaders": []
    }
]
```
