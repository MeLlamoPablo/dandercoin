module "identity_api" {
  source = "../packages/identity/infra/api"

  app_name                         = "${var.app_name}_identity"
  app_domain                       = var.app_domain
  base_domain                      = var.base_domain
  domain                           = var.identity_api_domain
  ethereum_chain_id                = var.ethereum_chain_id
  identity_oracle_contract_address = var.identity_oracle_contract_address
  use_route53                      = var.use_route53
}

module "identity_ses_verification" {
  # The domain should only be verified once. We only include the SES
  # verifications in the production workspace.
  count = terraform.workspace == "production" ? 1 : 0

  source = "../packages/identity/infra/ses-verification"

  base_domain = var.base_domain
  use_route53 = var.use_route53
}
