module "identity_api" {
  source = "../packages/identity/infra"

  app_name                         = "${var.app_name}_identity"
  app_domain                       = var.app_domain
  base_domain                      = var.base_domain
  domain                           = var.identity_api_domain
  ethereum_chain_id                = var.ethereum_chain_id
  identity_oracle_contract_address = var.identity_oracle_contract_address
  sendgrid_api_key                 = var.sendgrid_api_key
  use_route53                      = var.use_route53
}
