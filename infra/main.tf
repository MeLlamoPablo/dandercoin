terraform {
  required_version = ">= 0.14.4"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.37.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 4.9.2"
    }
    shell = {
      source  = "scottwinkler/shell"
      version = "~> 1.7.7"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

provider "github" {}
