from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path('/home/ubuntu/SynergyUI')
OUT = ROOT / 'web' / 'icons.json'

def parse_lua_table(path: Path):
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines()
    entries = []
    i = 0
    key_re = re.compile(r'^\s*\["([^"\\]+)"\]\s*=\s*(.*)$')
    while i < len(lines):
        match = key_re.match(lines[i])
        if not match:
            i += 1
            continue
        name, rhs = match.groups()
        if name in {'Icons', 'Spritesheets'}:
            i += 1
            continue
        entry = {'name': name, 'source': path.parent.name}
        direct = re.match(r'^"(.*)"\s*,?$', rhs.strip())
        if direct:
            entry.update({'kind': 'asset', 'image': direct.group(1)})
            entries.append(entry)
            i += 1
            continue
        number = re.match(r'^(\d+)\s*,?$', rhs.strip())
        if number:
            entry.update({'kind': 'sprite-reference', 'image': int(number.group(1))})
            entries.append(entry)
            i += 1
            continue
        if rhs.strip().startswith('{'):
            block = [rhs]
            depth = rhs.count('{') - rhs.count('}')
            j = i + 1
            while j < len(lines) and depth > 0:
                block.append(lines[j])
                depth += lines[j].count('{') - lines[j].count('}')
                j += 1
            blob = '\n'.join(block)
            image_string = re.search(r'\bImage\s*=\s*"([^"]+)"', blob)
            image_number = re.search(r'\bImage\s*=\s*(\d+)', blob)
            pos = re.search(r'ImageRectPosition\s*=\s*Vector2\.new\(([-\d.]+),\s*([-\d.]+)\)', blob)
            size = re.search(r'ImageRectSize\s*=\s*Vector2\.new\(([-\d.]+),\s*([-\d.]+)\)', blob)
            parts = re.search(r'\bParts\s*=\s*\{', blob)
            entry['kind'] = 'descriptor'
            if image_string:
                entry['image'] = image_string.group(1)
            elif image_number:
                entry['image'] = int(image_number.group(1))
            if pos:
                entry['rectPosition'] = [float(pos.group(1)), float(pos.group(2))]
            if size:
                entry['rectSize'] = [float(size.group(1)), float(size.group(2))]
            if parts:
                entry['hasParts'] = True
            entries.append(entry)
            i = j
            continue
        i += 1
    return entries

catalog = {}
for path in sorted((ROOT / 'src' / 'Icons').glob('*/Icons.lua')):
    catalog[path.parent.name] = parse_lua_table(path)

all_names = [entry['name'] for entries in catalog.values() for entry in entries]
result = {
    'generatedFrom': 'src/Icons/*/Icons.lua',
    'sets': catalog,
    'summary': {
        'setCount': len(catalog),
        'entryCount': len(all_names),
        'uniqueNameCount': len(set(all_names)),
        'duplicateNameCount': len(all_names) - len(set(all_names)),
        'counts': {name: len(entries) for name, entries in catalog.items()},
    },
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(json.dumps(result['summary'], indent=2))
