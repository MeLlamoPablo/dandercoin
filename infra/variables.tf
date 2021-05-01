variable "app_domain" {
  description = "The domain where the web app will be hosted. Must be a subdomain of the base domain."
}

variable "app_name" {
  default = "dandercoin"
}

variable "base_domain" {
  default = "danderco.in"
}

variable "github_repository" {
  default = "dandercoin"
}

variable "use_route53" {
  default     = true
  description = "If true, automatically create the Route 53 records (the AWS account must have a hosted zone for 'base_domain'). Otherwise they must be manually created. In that case, the Terraform plan will create the certificates but the creation of some resources will fail as they are invalid. They must be manually validated, and the Terraform plan must be re-attempted."
}
