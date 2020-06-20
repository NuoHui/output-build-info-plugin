# output-build-info-plugin

一个webpack插件，打包时候可以输出最后一次git相关记录，也支持自定义内容。多用于发版diff生产包问题等。


## Installation & Quick start

TODO

```json
// build-log.json
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