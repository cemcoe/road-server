class Utils {
  objToSQLString(obj: object) {
    // select * from users where name like '%o%';
    return Object.keys(obj).reduce((pre, cur, curIndex, arr) => {
      let res
      if (curIndex === arr.length - 1) {
        res = `${cur} like '%${obj[cur as keyof typeof obj]}%'`
      } else {
        res = `${cur} like '%${obj[cur as keyof typeof obj]}%' and`
      }

      return pre + ' ' + res
    }, '')
  }
}

export default new Utils()