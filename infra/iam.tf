resource "aws_iam_user" "deploy" {
  name = "${var.app_name}_${terraform.workspace}_deploy"
  path = "/terraform/"
}

resource "aws_iam_access_key" "deploy" {
  user = aws_iam_user.deploy.name
}

resource "aws_iam_user_policy_attachment" "deploy_identity_api" {
  user       = aws_iam_user.deploy.name
  policy_arn = module.identity_api.deploy_policy_arn
}

resource "aws_iam_user_policy_attachment" "deploy_web" {
  user       = aws_iam_user.deploy.name
  policy_arn = module.web.deploy_policy_arn
}
