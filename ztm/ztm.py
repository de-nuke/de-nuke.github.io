import re
import sys

from xml.etree import ElementTree as Et
import urllib.request


if len(sys.argv) > 1:
    lines = sys.argv[1]
    lines = set(lines.split(","))
else:
    lines = set()

with urllib.request.urlopen("https://www.wtp.waw.pl/feed/?post_type=impediment") as f:
    text = f.read().decode('utf-8')

tree = Et.fromstring(text)
channels = tree.findall("channel")

items = []

for channel in channels:
    for item in channel.findall("item"):
        items.append(item)

alerts = []
for item in items:
    title = item.find("title")
    title_parts = set(p.lower() for p in re.split(r"\W", title.text) if p)

    if lines.intersection(title_parts):
        alerts.append(title.text)

print(alerts)
