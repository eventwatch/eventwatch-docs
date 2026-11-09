#!/usr/bin/env bash
# 取得した仕様を PR で反映する。破壊的変更は人が確かめるまで止める。
#
# 使い方: sync.sh <取得した仕様> <作業ツリー>
# 環境変数: GH_TOKEN・ALLOW_BREAKING（true で破壊的変更も通す）
set -euo pipefail

spec="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
docs_repo="$2"
script_dir="$(cd "$(dirname "$0")" && pwd)"

target_path="openapi/org-api.json"
branch="automation/org-api-openapi"
target="${docs_repo}/${target_path}"
breaking_note=""

if [ -f "${target}" ]; then
  status=0
  "${script_dir}/check-breaking.sh" "${target}" "${spec}" || status=$?
  case "${status}" in
    0) ;;
    1)
      if [ "${ALLOW_BREAKING}" != "true" ]; then
        echo "::error::org-api に破壊的変更があるので反映を止めました。確かめたら workflow_dispatch の allow_breaking で流します"
        exit 1
      fi
      echo "::warning::allow_breaking が指定されたので破壊的変更を反映します"
      breaking_note=$'\n\n**破壊的変更を含みます（allow_breaking で実行）。**'
      ;;
    *) exit "${status}" ;;
  esac
fi

mkdir -p "$(dirname "${target}")"
cp "${spec}" "${target}"

cd "${docs_repo}"
# --head はブランチ名だけで絞るので、同じ名前のフォークの PR を除く
open_pr="$(gh pr list --head "${branch}" --state open --json number,isCrossRepository \
  --jq 'map(select(.isCrossRepository | not)) | .[0].number // empty')"

if [ -z "$(git status --porcelain -- "${target_path}")" ]; then
  # 仕様が main と同じに戻ったら、前に出した PR は取り消された内容なので閉じる
  if [ -n "${open_pr}" ]; then
    gh pr close "${open_pr}" --delete-branch --comment "仕様が main と同じに戻ったので閉じます。"
  fi
  echo "仕様は最新です"
  exit 0
fi

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git switch -C "${branch}"
git add "${target_path}"
git commit -m "docs: org-api の OpenAPI を更新する"
git push --force origin "HEAD:${branch}"

body="API の仕様の更新から自動で作った PR です。内容を確かめてマージしてください。${breaking_note}"

if [ -n "${open_pr}" ]; then
  gh pr edit "${open_pr}" --body "${body}"
  echo "既存の PR ${open_pr} を更新しました"
  exit 0
fi

gh pr create \
  --base main \
  --head "${branch}" \
  --title "docs: org-api の OpenAPI を更新する" \
  --body "${body}"
