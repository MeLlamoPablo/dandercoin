resource "aws_dynamodb_table" "email_verifications" {
  name           = "${var.app_name}_${terraform.workspace}_email_verifiactions"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "email"

  attribute {
    name = "email"
    type = "S"
  }

  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }
}
