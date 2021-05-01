module "apex" {
  # The apex domain redirect should only be provisioned once. We only include
  # it in the production workspace.
  count = terraform.workspace == "production" ? 1 : 0

  source = "../packages/apex/infra"

  app_name    = var.app_name
  base_domain = var.base_domain
  use_route53 = var.use_route53
}
