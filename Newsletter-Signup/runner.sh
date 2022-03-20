#!/bin/bash
set -euo pipefail

API_SERVER="us14"
API_KEY="c3ed317f70040549f5f0a669603d7f06-us14"

event_name="Bash Developers Meetup"

footer_contact_info='{
  "company": "Mailchimp",
  "address1": "675 Ponce de Leon Ave NE",
  "address2": "Suite 5000",
  "city": "Atlanta",
  "state": "GA",
  "zip": "30308",
  "country": "US"
}'

campaign_defaults='{
  "from_name": "Gettin'\'' Together",
  "from_email": "gettintogether@example.com",
  "subject": "Bash Developers Meetup",
  "language": "EN_US"
}'

curl -sS --request POST \
  --url "https://$API_SERVER.api.mailchimp.com/3.0/lists" \
  --user "key:$API_KEY" \
  --header 'content-type: application/json'
