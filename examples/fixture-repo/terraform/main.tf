# Minimal IaC fixture - no provider, just structure for evidence-extractor
variable "env" {
  type    = string
  default = "dev"
}

output "env" {
  value = var.env
}
