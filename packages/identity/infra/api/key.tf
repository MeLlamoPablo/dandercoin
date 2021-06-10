resource "shell_script" "signing_account" {
  lifecycle_commands {
    create = <<EOF
      yarn workspace @dandercoin/identity gen:key
    EOF
    delete = ""
  }
}
