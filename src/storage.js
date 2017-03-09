/**
 * Usage:(key is String)
 * key = 'name' or key = 'user.info.name'
 * Local.set(key, value)
 * Local.get(key)
 * Local.remove(key)
 * Session the same
 */
class Storage {
  constructor({type, collection}) {
    // use 'window.localStorage' or 'window.sessionStorage';
    // default 'window.sessionStorage'
    this.type = type || 'sessionStorage';

    // use collection name,
    // default use current hostname
    this.collection = collection || ('collection_' + window.location.hostname.replace(/\./gi, '_')).toLocaleUpperCase();
  }

  // 获取当前集合的所有数据
  __allin(){
    let allData = window[this.type].getItem(this.collection) || JSON.stringify({});
    return JSON.parse(allData);
  }

  // 重置集合数据
  __reset({data}) {
    let newData = JSON.stringify(data);
    try {
      window[this.type].setItem(this.collection, newData);
    } catch (error) {
      throw new Error(error);
    };
  }

  // 获取集合内单一文档数据
  // 允许接收 单个字段：name， 也允许接收纵深查询：user.info.age
  get(key) {
    // 取出存储的所有数据，是为当前顶层数据
    let database = this.__allin();
    // 传入单个字段，直接返回
    if (key.indexOf('.') === -1) return database[key];
    // 分解纵深查询参数
    let argumentsList = key.split('.');
    // 暂存查询出来的数据集合
    let collection = '';
    // 遍历查询纵深
    for (let item of argumentsList ) {
      // 取出数据集合
      collection = database[item];
      // 数据集合为空，则直接返回
      if (!collection) return collection;
      // 重置当前顶层数据
      database = collection;
    }
    // 返回最后的数据集合
    return collection
  }

  // 设置集合内单一文档数据
  // 允许接收 单个字段：name， 也允许接收纵深查询：user.info.age
  set(key, value) {
    // 取出存储的所有数据
    let database = this.__allin();
    if (key.indexOf('.') === -1) {
      database[key] = value;
    }
    else {
      let argumentsList = key.split('.');
      let collection = database;
      argumentsList.slice(0,-1).forEach(item => {
        if (!collection[item] || typeof(collection[item]) !== 'object') {
          collection[item] = {}
        }
        collection = collection[item];
      })
      collection[argumentsList.slice(-1)] = value;
    }
    return this.__reset({data: database})
  }

  // 删除集合内单一文档数据
  // 允许接收 单个字段：name， 也允许接收纵深查询：user.info.age
  remove(key) {
    // 取出存储的所有数据
    let database = this.__allin();
    if (key.indexOf('.') === -1) {
      delete database[key];
    }
    else {
      let argumentsList = key.split('.');
      let collection = database;
      argumentsList.slice(0,-1).forEach((item, index) => {
        collection = collection[item] ? collection[item] : {};
      })
      delete collection[argumentsList.slice(-1)]
    }
    return this.__reset({data: database})
  }
}

export default {
  Local: new Storage({type: 'localStorage'}),
  Session: new Storage({type: 'sessionStorage'})
}
