# output-build-info-plugin

一个webpack插件，打包时候可以输出最后一次git相关记录，也支持自定义内容。多用于发版本检查生产包等。


## Installation & Quick start

### Installation

```shell

npm i output-build-info-plugin -D
```

### Quick start

```shell
// webpack.config.js

const OutputBuildInfoWebpackPlugin = require('output-build-info-plugin');

new OutputBuildInfoWebpackPlugin({
  outputName: "build-test.json", // 输出文件名字
  env: "production" // 当前环境
}),
```
当你打包成功后就会在输出目录比如build下生成一个对应文件。

```json
// build-test.json
{
  "env": "production",
  "git": {
    "last_commit": {
      "hash": "c79772630ba4efb549b8e271f151cc276573a1a4",
      "date": "2020-06-20T11:27:25+08:00",
      "message": "test: init",
      "refs": "HEAD -> master",
      "body": "",
      "author_name": "xyz",
      "author_email": "xxxxxxx@163.com"
    },
    "current_branch": "master",
    "build_user": { "name": "xxx", "email": "xxxxxx@163.com" }
  }
}
```

## Changelog

[Changelog](https://github.com/NuoHui/output-build-info-plugin/blob/master/CHANGELOG.md)。

## TODO

后续继续扩展。