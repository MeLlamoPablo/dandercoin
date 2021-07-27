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

resource "github_actions_secret" "dandercoin_contract_address" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_DANDERCOIN_CONTRACT_ADDRESS"
  plaintext_value = var.dandercoin_contract_address
}

resource "github_actions_secret" "distributor_contract_address" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_DISTRIBUTOR_CONTRACT_ADDRESS"
  plaintext_value = var.distributor_contract_address
}

resource "github_actions_secret" "ethereum_chain_id" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_ETHEREUM_CHAIN_ID"
  plaintext_value = var.ethereum_chain_id
}

resource "github_actions_secret" "governor_contract_address" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_GOVERNOR_CONTRACT_ADDRESS"
  plaintext_value = var.governor_contract_address
}

resource "github_actions_secret" "identity_api_endpoint" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_IDENTITY_API_ENDPOINT"
  plaintext_value = module.identity_api.endpoint
}

resource "github_actions_secret" "identity_api_function_arn" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_AWS_IDENTITY_API_FUNCTION_ARN"
  plaintext_value = module.identity_api.function_arn
}

resource "github_actions_secret" "identity_oracle_contract_address" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_IDENTITY_ORACLE_CONTRACT_ADDRESS"
  plaintext_value = var.identity_oracle_contract_address
}

resource "github_actions_secret" "origin_request_function_arn" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_AWS_LAMBDA_ORIGIN_REQUEST_FUNCTION_ARN"
  plaintext_value = module.web.origin_request_function_arn
}

resource "github_actions_secret" "origin_response_function_arn" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_AWS_LAMBDA_ORIGIN_RESPONSE_FUNCTION_ARN"
  plaintext_value = module.web.origin_response_function_arn
}

resource "github_actions_secret" "timelock_contract_address" {
  repository      = var.github_repository
  secret_name     = "${upper(terraform.workspace)}_TIMELOCK_CONTRACT_ADDRESS"
  plaintext_value = var.timelock_contract_address
}
