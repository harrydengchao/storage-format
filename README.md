# storage-format


## Install

```bash
$ npm i -S storage-format
```

## Uasge

> * `s.local` use `window.localStorage`
> * `s.session` use `window.sessionStorage`

```javascript
import s from 'storage-format'

s.local.setItem('name', 'tom')
s.local.getItem('name')
// output: "tom"
s.local.removeItem('name')

s.local.setItem('a.b.c', '123')
s.local.getItem('a.b')
// output: {c: "123"}
s.local.removeItem('a.b')
s.local.clear()

s.session.setItem('a.b.c', '123')
s.session.getItem('a.b')
// output: {c: "123"}
s.session.removeItem('a.b')
s.session.clear()
```
