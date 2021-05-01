module "web" {
  source = "../packages/web/infra"

  app_domain  = var.app_domain
  app_name    = var.app_name
  base_domain = var.base_domain
  use_route53 = var.use_route53
}
