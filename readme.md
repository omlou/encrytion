### 介绍

给文本进行加密和解密的工具

### 使用

#### 在传统项目中使用

```html
<script src="https://gitee.com/xlou/encrytion/raw/master/dist/encrytion.min.js"></script>
<!-- 建议下载下来使用 -->
<script>
  /* 引入了该 js 文件后，会在 window 上赋值 Encry 对象 */
  let text=Encry.encrypt("hello encrytion","666666")
</script>
```

#### 在 Vue 、React 和 Angular 等项目中使用

安装

``` bash
npm i encrytion -S
```

main.js / main.ts 中使用

``` javascript
import {Encry} from 'encrytion'

let text=Encry.encrypt("hello encrytion","666666")
```

### API

#### encrypt:(input:string,password?:string)=>string&ensp;加密字符串

``` javascript
let text=Encry.encrypt("hello encrytion","666666") // 密钥是 666666
console.log(text) // 'aYVsBYHSZGKbcnl0aG9u'
```

#### decrypt:(input:string,password?:string)=>string&ensp;解密字符串

``` javascript
let text=Encry.decrypt('aYVsBYHSZGKbcnl0aG9u',"666666")
console.log(text) // 'hello encrytion'
```