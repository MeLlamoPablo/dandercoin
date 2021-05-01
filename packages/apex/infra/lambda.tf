data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com", "edgelambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "role_policy" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    effect = "Allow"

    resources = ["*"]
  }
}

resource "aws_iam_role" "main" {
  name = "${var.app_name}_apex_cloudfront_events"

  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

resource "aws_iam_policy" "main" {
  name   = "${var.app_name}_apex_cloudfront_events"
  policy = data.aws_iam_policy_document.role_policy.json
}

resource "aws_iam_role_policy_attachment" "main" {
  role       = aws_iam_role.main.name
  policy_arn = aws_iam_policy.main.arn
}

resource "aws_lambda_function" "apex_origin_request_event" {
  filename      = "../packages/web-fns/build/apex_origin_request_lambda_function.zip"
  function_name = "${var.app_name}_cf_apex_origin_request_event"
  handler       = "index.handler"
  role          = aws_iam_role.main.arn
  runtime       = "nodejs12.x"
  timeout       = 1
  publish       = true
}
