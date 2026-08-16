# Portfolio

Next.js App Router site, `next-intl` for i18n (`messages/*.json`), plain SCSS in `src/styles`
(`base.scss` for elements and single-purpose classes, `layout.scss` for structure, `media.scss` for
breakpoints).

## Comments

Comments are code: they have to be maintained, and most are stale the day they are written. Write
none by default.

- Prefer a descriptive identifier over a comment. A comment that says *what* the code does is a
  rename waiting to happen.
- Only write one for what the code genuinely cannot say: a browser quirk, a constraint tying two
  values together, a coupling to something in another file, or a decision whose obvious alternative
  is wrong.
- Never narrate history ("now spans the whole page", "no longer needed"). Git holds that.
- The banner headings in the SCSS files mark structure, not commentary. Leave them.
