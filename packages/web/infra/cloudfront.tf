resource "aws_cloudfront_distribution" "main" {
  comment         = "${var.app_name} (${terraform.workspace})"
  http_version    = "http2"
  is_ipv6_enabled = true

  origin {
    origin_id   = "origin-s3"
    domain_name = aws_s3_bucket.main.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.main.cloudfront_access_identity_path
    }
  }

  enabled             = true
  default_root_object = "index.html"

  custom_error_response {
    error_code            = "404"
    error_caching_min_ttl = "300"
    response_code         = 200
    response_page_path    = "/index.html"
  }

  aliases = [aws_acm_certificate.main.domain_name]

  default_cache_behavior {
    target_origin_id = "origin-s3"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    compress         = true

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    lambda_function_association {
      event_type   = "origin-request"
      lambda_arn   = aws_lambda_function.origin_request_event.qualified_arn
      include_body = false
    }

    lambda_function_association {
      event_type   = "origin-response"
      lambda_arn   = aws_lambda_function.origin_response_event.qualified_arn
      include_body = false
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 300
    max_ttl                = 1200
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.main.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1"
  }
}

resource "aws_cloudfront_origin_access_identity" "main" {
  comment = "${var.app_name} (${terraform.workspace})"
}
