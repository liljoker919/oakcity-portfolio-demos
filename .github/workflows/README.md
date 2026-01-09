# GitHub Actions Workflows

## Deployment Workflow

The `deploy.yml` workflow automatically deploys all demo sites to AWS S3 and CloudFront when changes are merged to the `main` branch.

### How It Works

- **Trigger**: Automatically runs on push to `main` branch, or can be manually triggered
- **Independent Deployments**: Each site (cleaning, handyman, coach, freelancer) deploys independently as separate jobs
- **Build Process**: Uses npm workspaces to build each Astro site
- **AWS Deployment**: Syncs built files to S3 and invalidates CloudFront cache

### Required GitHub Secrets

Configure the following secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

#### AWS Credentials (shared across all sites)
- `AWS_ACCESS_KEY_ID` - AWS access key with S3 and CloudFront permissions
- `AWS_SECRET_ACCESS_KEY` - AWS secret access key
- `AWS_REGION` - AWS region (optional, defaults to `us-east-1`)

#### Per-Site S3 Buckets
- `S3_BUCKET_CLEANING` - S3 bucket name for cleaning demo site
- `S3_BUCKET_HANDYMAN` - S3 bucket name for handyman demo site
- `S3_BUCKET_COACH` - S3 bucket name for coach demo site
- `S3_BUCKET_FREELANCER` - S3 bucket name for freelancer demo site

#### Per-Site CloudFront Distribution IDs
- `CLOUDFRONT_DISTRIBUTION_ID_CLEANING` - CloudFront distribution ID for cleaning site
- `CLOUDFRONT_DISTRIBUTION_ID_HANDYMAN` - CloudFront distribution ID for handyman site
- `CLOUDFRONT_DISTRIBUTION_ID_COACH` - CloudFront distribution ID for coach site
- `CLOUDFRONT_DISTRIBUTION_ID_FREELANCER` - CloudFront distribution ID for freelancer site

### AWS IAM Permissions

The AWS credentials need the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::*:distribution/*"
    }
  ]
}
```

### Manual Deployment

You can manually trigger a deployment:
1. Go to Actions tab in GitHub
2. Select "Deploy Demo Sites to AWS S3 and CloudFront"
3. Click "Run workflow"
4. Select the branch (usually `main`)
5. Click "Run workflow"

### Deployment Output

Each job provides a deployment summary including:
- Website URL
- S3 Bucket name
- CloudFront Distribution ID
- Cache invalidation status

### Cache Control Strategy

- **Static assets** (JS, CSS, images): 1 hour cache (`max-age=3600`)
- **HTML/XML files**: 5 minutes cache with revalidation (`max-age=300, must-revalidate`)

This ensures quick updates for content changes while maintaining good performance for static assets.

### Adding New Sites

When adding a new demo site:

1. Add the site's build script to root `package.json`
2. Create a new job in `deploy.yml` following the existing pattern
3. Add the site's S3 bucket secret (e.g., `S3_BUCKET_NEWSITE`)
4. Add the site's CloudFront distribution ID secret (e.g., `CLOUDFRONT_DISTRIBUTION_ID_NEWSITE`)
