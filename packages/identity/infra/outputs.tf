output "endpoint" {
  value = "https://${aws_apigatewayv2_domain_name.api.domain_name}"
}

output "function_arn" {
  value = aws_lambda_function.function.arn
}

output "deploy_policy_arn" {
  value = aws_iam_policy.deploy.arn
}

output "signing_address" {
  value = shell_script.signing_account.output["address"]
}
