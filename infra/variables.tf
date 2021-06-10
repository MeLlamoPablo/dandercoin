variable "app_domain" {
  description = "The domain where the web app will be hosted. Must be a subdomain of the base domain."
}

variable "app_name" {
  default = "dandercoin"
}

variable "base_domain" {
  default = "danderco.in"
}

variable "dandercoin_contract_address" {}

variable "distributor_contract_address" {}

variable "ethereum_chain_id" {}

variable "github_repository" {
  default = "dandercoin"
}

variable "identity_api_domain" {
  description = "The domain where the identity api will be hosted. Must be a subdomain of the base domain."
}

variable "identity_oracle_contract_address" {}

variable "use_route53" {
  default     = true
  description = "If true, automatically create the Route 53 records (the AWS account must have a hosted zone for 'base_domain'). Otherwise they must be manually created. In that case, the Terraform plan will create the certificates but the creation of some resources will fail as they are invalid. They must be manually validated, and the Terraform plan must be re-attempted."
}
