---
title: Compatibility promise
description: What EventWatch promises when changing the API, and the notice period for breaking changes.
---

Old versions of the distributed WordPress plugin stay on users' sites. So that you can keep using the API with confidence, we promise the following.

## Breaking changes

The following are treated as breaking changes.

- Removing an operation or field
- Changing the type of a field
- Making an optional field required

## When we make a breaking change

We don't change the meaning of current URLs. We add a new version, such as `/api/v2.0/`, and run it alongside the current one.

**The current version keeps running for at least 6 months after the new version is released.** Notice is posted on this site.

## What is not a breaking change

The following changes are made without notice. Clients should ignore fields they don't know.

- Adding an operation
- Adding a field to a response
- Adding an optional field to a request

## Versions

The version in the URL (`/api/v1.0/`) and the version in the [API overview](/en/api/) (`1.0`) match. Non-breaking changes don't raise the version.

## Errors

The [API operation pages](/en/api/) list only successful responses. The error format and `code` values are described in [Error format and codes](/en/api/errors). Removing a `code` or changing its meaning follows the same promise as a breaking change. New `code` values may be added without notice, so handle any `code` you don't know by its status.

## Finding out about changes

See [How to read the changelog](/en/changelog).
