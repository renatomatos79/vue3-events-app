# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}


variable "cluster_name" {
  description = "Description of the cluster"
  type        = string
  default     = "udemy-eks-cluster"
}
