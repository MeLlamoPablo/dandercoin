resource "aws_cloudwatch_log_group" "function" {
  name              = "/aws/lambda/${aws_lambda_function.function.function_name}"
  retention_in_days = 7
}

resource "aws_cloudwatch_log_group" "api" {
  name              = "/aws/apigateway/${var.app_name}_api_${terraform.workspace}"
  retention_in_days = 7
}
