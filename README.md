### Explain
- [x] storage: Format the settings and get the plugins for Storage

---

> ### Storage

* This is mainly for the convenience of their own use, but also inspired by mongodb.
* Greatly simplifies the operation of the Web for data caching

```javascript
npm install --save storage-format
```

### Use
```javascript
// import storage-format
import Storage from 'storage-format'

/**
 * There are two APIs that use the method exactly the same
 * Storage.Local <= window.localStorage
 * Storage.Session <= window.sessionStorage
 */

// save data
Storage.Local.set('name', 'Jack');  // => { "name": "Jack" }

// save data
Storage.Local.set('user.info.age', 26);  // => { "user": { "info": { "age": 26 } } }

// get data
Storage.Local.get('name');  // => Jack
Storage.Local.get('user.info.age'); // => 26

// remove data
Storage.Local.remove('name');
Storage.Local.remove('user.info.age');

```
