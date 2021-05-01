resource "aws_s3_bucket" "main" {
  bucket = local.main_bucket_name
  acl    = "private"
  policy = data.aws_iam_policy_document.main.json

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.main.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

data "aws_iam_policy_document" "main" {
  statement {
    sid = "AllowCFOriginAccess"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "arn:aws:s3:::${local.main_bucket_name}/*",
    ]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.main.iam_arn]
    }
  }
}
