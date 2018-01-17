// 引入主模块
export * from "echarts/src/echarts";
// 引入饼图
import "echarts/src/chart/pie";

// 使用下面的命令生成我们的自定义 echarts 代码，按需引入，体积减小！
// node node_modules/echarts/build/build.js --min -i static/scripts/echarts.custom.js -o static/scripts/echarts.custom.min.js
