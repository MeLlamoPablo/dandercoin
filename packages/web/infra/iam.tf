data "aws_iam_policy_document" "deploy" {
  statement {
    sid = "AccessBucket"

    actions = [
      "s3:ListBucket",
    ]

    resources = [
      "arn:aws:s3:::${aws_s3_bucket.main.bucket}",
    ]
  }

  statement {
    sid = "ClearCache"

    actions = [
      "cloudfront:CreateInvalidation",
    ]

    resources = [
      aws_cloudfront_distribution.main.arn,
    ]
  }

  statement {
    sid = "DeployCode"

    actions = ["lambda:UpdateFunctionCode", "lambda:PublishVersion"]

    resources = [
      aws_lambda_function.origin_request_event.arn,
      aws_lambda_function.origin_response_event.arn,
    ]
  }

  statement {
    sid = "DeployObjects"

    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject"
    ]

    resources = [
      "arn:aws:s3:::${aws_s3_bucket.main.bucket}/*",
    ]
  }

  statement {
    sid = "UpdateLambdaAssociations"

    actions = [
      "cloudfront:GetDistribution",
      "cloudfront:UpdateDistribution",
    ]

    resources = [aws_cloudfront_distribution.main.arn]
  }

  statement {
    sid = "UpdateLambdaFunctions"

    actions = [
      "lambda:EnableReplication",
      "lambda:GetFunction",
      "lambda:PublishVersion",
      "lambda:UpdateFunctionCode",
    ]

    resources = [
      aws_lambda_function.origin_request_event.arn,
      aws_lambda_function.origin_response_event.arn,
      # Allow to retrieve versions in addition to functions
      "${aws_lambda_function.origin_request_event.arn}:*",
      "${aws_lambda_function.origin_response_event.arn}:*",
    ]
  }
}

resource "aws_iam_policy" "deploy" {
  name        = "${var.app_name}.${terraform.workspace}.deploy"
  description = "Allows deploying to the ${terraform.workspace} environment of ${var.app_name}. Managed by Terraform."
  policy      = data.aws_iam_policy_document.deploy.json
}
