#!/usr/bin/env bash

# Make sure the current directory is the location of this script to simplify matters
cd "$(dirname "$(readlink -f "$0")")" || { echo "Error: Failed to cd to script  directory" >&2; exit 1; };

ENV_VAR_FILE="${ENV_VAR_FILE:-./env_vars}";
if [[ ! -r "${ENV_VAR_FILE}" ]]; then
	echo "Error: The environment variables file at ${ENV_VAR_FILE} does not exist." >&2;
	exit 2;
fi

#shellcheck disable=SC1090
source "${ENV_VAR_FILE}";

if [[ -z "${DISCORD_TOKEN}" ]]; then
	echo "Error: The DISCORD_TOKEN environment variable isn't defined." &>2;
	exit 3;
fi
if [[ -z "${PREFIX}" ]]; then
	echo "Error: The PREFIX environment variable isn't defined." &>2;
	exit 4;
fi

export DISCORD_TOKEN;
export PREFIX;

echo ">>> [wrapper] ARGS: ${ARGS}" >&2;

# Word splitting is intentional here
#shellcheck disable=SC2086
./index.mjs start ${ARGS};