#!/usr/bin/env bash
# 判定と反映の停止が効いていることを見本の仕様で確かめる。
# 同じ仕様どうしは 0、口を 1 つ消した仕様は 1 になり、消した仕様は作業ツリーへ反映されないこと。
set -uo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
spec="${script_dir}/guard-fixture.json"
workdir="$(mktemp -d)"
mutated="${workdir}/mutated.json"
docs_repo="${workdir}/docs-repo"

if ! "${script_dir}/check-breaking.sh" "${spec}" "${spec}"; then
  echo "the same spec must not be reported as breaking" >&2
  exit 1
fi

jq 'del(.paths["/example/items/{id}"])' "${spec}" > "${mutated}"

"${script_dir}/check-breaking.sh" "${spec}" "${mutated}"
status=$?
if [ "${status}" -ne 1 ]; then
  echo "removing an operation must be reported as breaking, got exit code ${status}" >&2
  exit 1
fi

git init -q "${docs_repo}"
mkdir -p "${docs_repo}/openapi"
cp "${spec}" "${docs_repo}/openapi/org-api.json"
git -C "${docs_repo}" add openapi/org-api.json
git -C "${docs_repo}" -c user.name=guard -c user.email=guard@example.invalid commit -q -m initial
head_before="$(git -C "${docs_repo}" rev-parse HEAD)"

ALLOW_BREAKING=false "${script_dir}/sync.sh" "${mutated}" "${docs_repo}"
status=$?
if [ "${status}" -ne 1 ]; then
  echo "syncing a breaking change must stop with exit code 1, got ${status}" >&2
  exit 1
fi
if [ "$(git -C "${docs_repo}" rev-parse HEAD)" != "${head_before}" ] || [ -n "$(git -C "${docs_repo}" status --porcelain)" ]; then
  echo "a stopped sync must not change the working tree" >&2
  exit 1
fi

echo "breaking guard works"
