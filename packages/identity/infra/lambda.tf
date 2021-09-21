data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "role_policy" {
  statement {
    actions = [
      "dynamodb:DeleteItem",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
    ]

    effect = "Allow"

    resources = [
      aws_dynamodb_table.email_verifications.arn,
    ]
  }

  statement {
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    effect = "Allow"

    resources = [
      "${aws_cloudwatch_log_group.api.arn}:log-stream:*",
      "${aws_cloudwatch_log_group.function.arn}:log-stream:*",
    ]
  }
}

resource "aws_iam_role" "function" {
  name = "${var.app_name}_api_function"

  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

resource "aws_iam_policy" "function" {
  name   = "${var.app_name}_api_function"
  policy = data.aws_iam_policy_document.role_policy.json
}

resource "aws_iam_role_policy_attachment" "function" {
  role       = aws_iam_role.function.name
  policy_arn = aws_iam_policy.function.arn
}

resource "aws_lambda_permission" "api" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/${aws_apigatewayv2_stage.default.name}"
  statement_id  = "AllowAuthAPIInvoke"
}

resource "aws_lambda_function" "function" {
  filename      = "../packages/identity/build/lambda_function.zip"
  function_name = "${var.app_name}_api"
  handler       = "index.handler"
  role          = aws_iam_role.function.arn
  runtime       = "nodejs12.x"
  timeout       = 30

  environment {
    variables = {
      DB_EMAIL_VERIFICATIONS_TABLE_NAME = aws_dynamodb_table.email_verifications.name
      ETHEREUM_CHAIN_ID                 = var.ethereum_chain_id
      IDENTITY_ORACLE_ADDRESS           = var.identity_oracle_contract_address
      IDENTITY_SIGNING_KEY              = shell_script.signing_account.output["privateKey"]
      SENDGRID_API_KEY                  = var.sendgrid_api_key
      WEB_DOMAIN_NAME                   = var.app_domain
    }
  }
}
