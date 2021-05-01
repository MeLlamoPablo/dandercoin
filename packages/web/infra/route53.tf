data "aws_route53_zone" "main" {
  count        = var.use_route53 ? 1 : 0
  name         = var.base_domain
  private_zone = false
}

resource "aws_route53_record" "main" {
  count   = var.use_route53 ? 1 : 0
  zone_id = data.aws_route53_zone.main[0].zone_id
  name    = var.app_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
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
