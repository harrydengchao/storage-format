import _set from 'lodash.set'
import _get from 'lodash.get'
import _unset from 'lodash.unset'

class Storage {
  constructor() {
    // localStorage
    this.local = {
      setItem: (path, val) => {
        return this._setItem('localStorage', path, val)
      },
      getItem: (path) => {
        return this._getItem('localStorage', path)
      },
      removeItem: (path) => {
        return this._removeItem('localStorage', path)
      }
    }
    // sessionStorage
    this.session = {
      setItem: (path, val) => {
        return this._setItem('sessionStorage', path, val)
      },
      getItem: (path) => {
        return this._getItem('sessionStorage', path)
      },
      removeItem: (path) => {
        return this._removeItem('sessionStorage', path)
      }
    }
  }

  // 判断是 json 字符串
  _isJsonStr(args) {
    return /^{.*}$/.test(args)
  }

  // 判断是 Object
  _isObject(args) {
    return Object.prototype.toString.call(args) === '[object Object]'
  }

  // 获取字符串路径前缀
  _getPrefix(path) {
    let prefix = /^(\w{1,})\.?.*/.exec(path)[1]
    return prefix
  }

  // 设置值
  _setItem(type, path, val) {
    let prefix = this._getPrefix(path)
    let oldData = window[type].getItem(prefix)
    oldData = this._isJsonStr(oldData) ? JSON.parse(oldData) : oldData
    let obj = {
      [prefix]: oldData
    }
    obj = _set(obj, path, val)
    return window[type].setItem(prefix, this._isObject(obj[prefix]) ? JSON.stringify(obj[prefix]) : obj[prefix])
  }

  // 获取值
  _getItem(type, path) {
    let prefix = this._getPrefix(path)
    let oldData = window[type].getItem(prefix)
    oldData = this._isJsonStr(oldData) ? JSON.parse(oldData) : oldData
    let obj = {
      [prefix]: oldData
    }
    let result = _get(obj, path, null)
    return result
  }

  // 删除值
  _removeItem(type, path) {
    let prefix = this._getPrefix(path)
    let oldData = window[type].getItem(prefix)
    oldData = this._isJsonStr(oldData) ? JSON.parse(oldData) : oldData
    let obj = {
      [prefix]: oldData
    }
    let result = _unset(obj, path)
    obj[prefix] = Object.prototype.toString.call(obj[prefix]) === '[object Undefined]' ? '' : obj[prefix]
    console.log(obj[prefix])
    window[type].setItem(prefix, this._isObject(obj[prefix]) ? JSON.stringify(obj[prefix]) : obj[prefix])
    return result
  }

  // 清除
  _clear(type) {
    return window[type].clear()
  }
}

export default new Storage()
