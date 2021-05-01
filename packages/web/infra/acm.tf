resource "aws_acm_certificate" "main" {
  domain_name       = var.app_domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${var.app_name} - ${terraform.workspace}"
  }
}

resource "aws_acm_certificate_validation" "cert" {
  count           = var.use_route53 ? 1 : 0
  certificate_arn = aws_acm_certificate.main.arn
  validation_record_fqdns = [
  aws_route53_record.validation[0].fqdn]
}
