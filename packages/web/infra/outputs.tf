output "deploy_policy_arn" {
  value = aws_iam_policy.deploy.arn
}

output "bucket_name" {
  value = aws_s3_bucket.main.bucket
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.main.id
}

output "origin_request_function_arn" {
  value = aws_lambda_function.origin_request_event.arn
}

output "origin_response_function_arn" {
  value = aws_lambda_function.origin_response_event.arn
}
