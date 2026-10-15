#!/usr/bin/env python3
"""Extractor helper for the course-pipeline skill.

Usage:  python extract_pdf.py <source.pdf> <out_dir>
Writes: raw-content.md, page-inventory.json, pages/pNN.png (60 dpi thumbnails),
        and prints a short summary. Needs: pip install pymupdf
Writes UTF-8 files only (do not print Thai to a cp874 console).
"""
import collections
import json
import os
import sys

import pymupdf

# Thai PowerPoint exports map vowel/tone marks to private-use glyphs (U+F700-U+F71B).
PUA = {
    0xF700: 'ฐ', 0xF701: 'ิ', 0xF702: 'ี', 0xF703: 'ึ', 0xF704: 'ื',
    0xF705: '่', 0xF706: '้', 0xF707: '๊', 0xF708: '๋', 0xF709: '์',
    0xF70A: '่', 0xF70B: '้', 0xF70C: '๊', 0xF70D: '๋', 0xF70E: '์',
    0xF70F: 'ญ', 0xF710: 'ั', 0xF711: 'ํ', 0xF712: '็', 0xF713: '่',
    0xF714: '้', 0xF715: '๊', 0xF716: '๋', 0xF717: '์', 0xF718: 'ุ',
    0xF719: 'ู', 0xF71A: 'ฺ', 0xF71B: 'ํ', 0xF076: '•',
}


def fix(text):
    return ''.join(PUA.get(ord(c), c) for c in text).replace('ํา', 'ำ')


def main(src, out):
    os.makedirs(os.path.join(out, 'pages'), exist_ok=True)
    doc = pymupdf.open(src)
    shared = collections.Counter()
    for page in doc:
        for im in page.get_images(full=True):
            shared[im[0]] += 1
    unmapped = collections.Counter()
    inventory, raw = [], []
    for n, page in enumerate(doc, 1):
        text = page.get_text()
        for c in text:
            if 0xE000 <= ord(c) <= 0xF8FF and ord(c) not in PUA:
                unmapped[hex(ord(c))] += 1
        fixed = fix(text)
        # images used on more than 3 pages are logos/backgrounds
        imgs = [{'xref': im[0], 'w': im[2], 'h': im[3]}
                for im in page.get_images(full=True) if shared[im[0]] <= 3]
        drawings = len(page.get_drawings())
        flags = []
        if len(fixed.strip()) < 120:
            flags.append('sparse-text: likely diagram/title page, verify visually')
        if imgs:
            flags.append(f'{len(imgs)} unique image(s): text may live inside the image')
        if drawings >= 10:
            flags.append(f'{drawings} vector drawings (diagram)')
        inventory.append({
            'page': n, 'chars': len(text), 'words': len(fixed.split()),
            'unique_images': imgs, 'drawings': drawings, 'flags': flags,
            'status': 'extracted' if not flags else 'needs-visual-check',
        })
        raw.append(f'<!-- page {n} -->\n## [p.{n}]\n\n{fixed.strip()}\n')
        page.get_pixmap(dpi=60).save(os.path.join(out, 'pages', f'p{n:02d}.png'))
    with open(os.path.join(out, 'raw-content.md'), 'w', encoding='utf-8') as f:
        f.write('# raw-content (PUA Thai glyphs remapped)\n\n' + '\n'.join(raw))
    with open(os.path.join(out, 'page-inventory.json'), 'w', encoding='utf-8') as f:
        json.dump(inventory, f, ensure_ascii=False, indent=1)
    flagged = [r['page'] for r in inventory if r['status'] != 'extracted']
    print('pages:', len(doc), '| metadata:', doc.metadata.get('title'), '|', doc.metadata.get('creator'))
    print('unmapped private-use glyphs:', dict(unmapped) or 'none')
    print('pages needing visual check:', flagged)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
