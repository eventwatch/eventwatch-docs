#!/usr/bin/env bash
# 版と SHA-256 はワークフローの env（OASDIFF_VERSION・OASDIFF_SHA256）で固定する。
set -euo pipefail

archive="oasdiff_${OASDIFF_VERSION}_linux_amd64.tar.gz"
workdir="$(mktemp -d)"
bin_dir="${HOME}/.local/bin"

curl -fsSL -o "${workdir}/${archive}" \
  "https://github.com/oasdiff/oasdiff/releases/download/v${OASDIFF_VERSION}/${archive}"
echo "${OASDIFF_SHA256}  ${workdir}/${archive}" | sha256sum --check --quiet
tar -xzf "${workdir}/${archive}" -C "${workdir}" oasdiff
mkdir -p "${bin_dir}"
install -m 0755 "${workdir}/oasdiff" "${bin_dir}/oasdiff"
echo "${bin_dir}" >> "${GITHUB_PATH}"
"${bin_dir}/oasdiff" --version
