data "aws_route53_zone" "main" {
  count = var.use_route53 ? 1 : 0

  name         = var.base_domain
  private_zone = false
}

resource "aws_route53_record" "domain_validation" {
  count = var.use_route53 ? 1 : 0

  name    = "_amazonses.${var.base_domain}"
  records = [aws_ses_domain_identity.main.verification_token]
  ttl     = 600
  type    = "TXT"
  zone_id = data.aws_route53_zone.main.0.zone_id
}

resource "aws_route53_record" "dkim_validation" {
  count = var.use_route53 ? 3 : 0

  zone_id = data.aws_route53_zone.main.0.zone_id
  name    = "${element(aws_ses_domain_dkim.main.dkim_tokens, count.index)}._domainkey"
  type    = "CNAME"
  ttl     = "600"
  records = ["${element(aws_ses_domain_dkim.main.dkim_tokens, count.index)}.dkim.amazonses.com"]
}
