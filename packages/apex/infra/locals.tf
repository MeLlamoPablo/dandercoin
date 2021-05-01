resource "random_id" "bucket" {
  byte_length = 4
}

locals {
  empty_bucket_name = "${var.app_name}.apex.${random_id.bucket.hex}"
}
