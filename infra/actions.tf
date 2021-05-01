resource "github_actions_secret" "aws_access_key_id" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_AWS_ACCESS_KEY_ID"
  plaintext_value = aws_iam_access_key.deploy.id
}

resource "github_actions_secret" "aws_secret_access_key" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_AWS_SECRET_ACCESS_KEY"
  plaintext_value = aws_iam_access_key.deploy.secret
}

resource "github_actions_secret" "bucket_name" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_AWS_S3_BUCKET_NAME"
  plaintext_value = module.web.bucket_name
}

resource "github_actions_secret" "cf_distribution" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_AWS_CF_DISTRIBUTION_ID"
  plaintext_value = module.web.cloudfront_distribution_id
}

resource "github_actions_secret" "origin_request_function_arn" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_AWS_ORIGIN_REQUEST_FUNCTION_ARN"
  plaintext_value = module.web.origin_request_function_arn
}

resource "github_actions_secret" "origin_response_function_arn" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_AWS_ORIGIN_RESPONSE_FUNCTION_ARN"
  plaintext_value = module.web.origin_response_function_arn
}
