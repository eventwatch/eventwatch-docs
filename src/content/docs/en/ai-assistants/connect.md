---
title: Create drafts with an AI assistant
description: How to connect Claude or ChatGPT to EventWatch so it can create event drafts from flyers and announcements, and how to revoke access.
---

When you connect the AI assistant you already use (Claude, ChatGPT, and others) to EventWatch, it can create event drafts from a flyer image or an announcement. There is no API key to copy.

EventWatch screen names on this page match the English display as of November 21, 2026.

## What it can and can't do

AI assistants create drafts only. You check the details and send them for review yourself on EventWatch.

| Can do | Can't do |
| --- | --- |
| Create drafts | Send for review, publish, or delete |
| Edit drafts that AI assistants made | Touch drafts people wrote on the web (it can't read or edit them) |
| Add an image to a draft (some AI assistants can't pass images) | |

Each organizer can have up to 50 unsubmitted drafts created by AI assistants. When you reach the limit, send some drafts for review or delete them on EventWatch.

## What you need

- An organizer on EventWatch. If you don't have one yet, see [If you don't have an organizer yet](#if-you-dont-have-an-organizer-yet)
- An AI assistant that can add a custom MCP connector

## Connect Claude

Open the following link. Claude's screen for adding a custom connector opens with the name and URL already filled in.

[Add EventWatch to Claude](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=EventWatch&connectorUrl=https%3A%2F%2Feventwatch.app%2Fapi%2Fmcp)

1. Check that the name is `EventWatch` and the URL is `https://eventwatch.app/api/mcp`, then continue. Claude shows a notice that the connector came from an external link.
2. Keep the authentication setting that signs in now, and add the connector.
3. On the connector's page, connect it. The EventWatch permission screen opens.
4. Check the details and select **Allow**. When you're back in Claude and it says EventWatch is connected, you're done.

Without the link, add a custom connector from Claude's plugin or connector settings, enter `EventWatch` as the name and `https://eventwatch.app/api/mcp` as the URL, and continue from step 1.

## Connect ChatGPT

1. In ChatGPT, open **Plugins**, select **Add**, and choose **Add custom MCP server**.
2. Enter `EventWatch` as the name and `https://eventwatch.app/api/mcp` as the URL. Leave authentication set to **OAuth**, read the notice, and select **Create as a plugin**.
3. On the EventWatch screen that opens, check the details and select **Allow**.

AI assistants rename their screens when they update. If you can't find a screen, see that product's help for MCP or connectors.

## What to check on the permission screen

The permission screen (**Allow an AI assistant**) shows the following.

| Item | Meaning |
| --- | --- |
| **Allowing** | The AI assistant you are connecting |
| **Sends to** | The site you return to after allowing. For Claude, `claude.ai` |
| **Organizer** | The organizer the drafts are created for. If you belong to more than one, you can choose here |
| **Logged in as** | The person logged in to EventWatch now |

It also lists what the assistant will and won't be able to do. If you don't recognize the AI assistant or where it sends to, select **Don't allow**.

## What to ask

Once connected, just ask your AI assistant in your own words.

- With a flyer image: "Post this flyer to EventWatch as a draft."
- To fix a draft it made: "Change the start time of that draft to 6 p.m."

The AI assistant returns the URL of the draft's edit page. Open it, check the details, and send it for review on EventWatch. After you send it for review, the AI assistant can't change it.

Some AI assistants can't pass images. In that case, add the image on the EventWatch edit page.

## Revoke access

1. On EventWatch, open **Organizer settings › AI assistants**.
2. In **Allowed AI assistants**, select **Revoke** for the AI assistant.
3. Select **Revoke** in the confirmation.

After you revoke access, that AI assistant can no longer create drafts. Drafts it already made stay. To use it again, connect it again.

Access a person allowed also stops working when:

- they are removed from or leave the organizer
- they close their EventWatch account

Remove the connector left in the AI assistant from that product's settings.

## If you don't have an organizer yet

The permission screen shows **Post your first event to create an organizer**. An organizer is created when you post your first event. Post one from **Post an event**, then connect again from your AI assistant's settings.

## For developers

The connection method and tool specifications are in [MCP connection and authentication](/en/mcp/authentication) and [MCP tools](/en/mcp/tools).
