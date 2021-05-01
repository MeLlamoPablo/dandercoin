resource "random_id" "bucket" {
  byte_length = 4
}

locals {
  main_bucket_name = "${var.app_name}.${terraform.workspace}.${random_id.bucket.hex}"
}
