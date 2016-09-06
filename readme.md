## 本项目是webpack配置文件的示例

#### webpack.config.js

传统默认配置

_该文件中对每项配置均进行了详细解说明_

> webpack

发布目录为：`dist_default` ，可通过index.html访问

#### webpack.config.css.js

分离CSS文件的示例

发布目录为：`dist_css` ，可通过index-css.html访问

> webpack  --config=./webpack.config.css.js

#### webpack.config.mul.js

多页项目的示例
发布目录为：`dist_mul` ，可通过dist_mul/index.html访问
> webpack  --config=./webpack.config.mul.js