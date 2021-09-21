data "aws_iam_policy_document" "deploy" {
  statement {
    sid = "DeployCode"

    actions = ["lambda:UpdateFunctionCode"]

    resources = [aws_lambda_function.function.arn]
  }
}

resource "aws_iam_policy" "deploy" {
  name        = "${var.app_name}.${terraform.workspace}.deploy"
  description = "Allows deploying the backend of the ${terraform.workspace} environment of ${var.app_name}. Managed by Terraform."
  policy      = data.aws_iam_policy_document.deploy.json
}
