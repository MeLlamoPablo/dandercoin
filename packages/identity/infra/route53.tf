data "aws_route53_zone" "main" {
  count        = var.use_route53 ? 1 : 0
  name         = var.base_domain
  private_zone = false
}

resource "aws_route53_record" "api" {
  count   = var.use_route53 ? 1 : 0
  name    = aws_apigatewayv2_domain_name.api.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.main.0.zone_id

  alias {
    name                   = aws_apigatewayv2_domain_name.api.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "validation" {
  count   = var.use_route53 ? 1 : 0
  name    = tolist(aws_acm_certificate.main.domain_validation_options).0.resource_record_name
  type    = tolist(aws_acm_certificate.main.domain_validation_options).0.resource_record_type
  zone_id = data.aws_route53_zone.main.0.zone_id
  records = [
  tolist(aws_acm_certificate.main.domain_validation_options).0.resource_record_value]
  ttl = 60
}
