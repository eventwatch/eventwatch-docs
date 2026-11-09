#!/usr/bin/env bash
# 破壊的変更があれば結果を出して終了コード 1 を返す。無ければ 0。
# oasdiff の実行自体の失敗（読めない仕様など）は 2 を返し、「破壊的変更なし」と区別する。
#
# 使い方: check-breaking.sh <前回の仕様> <今回の仕様>
set -uo pipefail

if [ "$#" -ne 2 ]; then
  echo "usage: $0 <previous> <current>" >&2
  exit 2
fi

oasdiff breaking --fail-on ERR "$1" "$2"
status=$?

case "${status}" in
  0) exit 0 ;;
  1) exit 1 ;;
  *)
    echo "oasdiff failed with exit code ${status}" >&2
    exit 2
    ;;
esac
