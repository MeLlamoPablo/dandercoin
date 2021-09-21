resource "aws_apigatewayv2_api" "api" {
  name                         = "${var.app_name}_api"
  disable_execute_api_endpoint = true
  protocol_type                = "HTTP"
}

resource "aws_apigatewayv2_domain_name" "api" {
  domain_name = var.domain

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.main.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "api" {
  api_id      = aws_apigatewayv2_api.api.id
  domain_name = aws_apigatewayv2_domain_name.api.id
  stage       = aws_apigatewayv2_stage.default.id
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id           = aws_apigatewayv2_api.api.id
  integration_type = "AWS_PROXY"

  connection_type      = "INTERNET"
  integration_method   = "POST"
  integration_uri      = aws_lambda_function.function.invoke_arn
  passthrough_behavior = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_route" "api" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.api.id
  auto_deploy = true
  name        = "$default"

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api.arn
    format          = "$context.identity.sourceIp - - [$context.requestTime] \"$context.httpMethod $context.routeKey $context.protocol\" $context.status $context.responseLength $context.requestId - $context.error.message $context.integrationErrorMessage"
  }
}
