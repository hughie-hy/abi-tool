# Web3 ABI调用工具

一个用于EVM链智能合约调用测试的Web工具。

## 功能特性

### 网络支持
- Ethereum 主网
- Ethereum Sepolia 测试网
- Arbitrum One 主网
- Arbitrum Sepolia 测试网

### 核心功能
1. **ABI导入与解析**
   - 支持粘贴ABI JSON数据
   - 自动解析并展示合约中的所有函数
   - 显示函数状态可变性和参数信息

2. **函数调用**
   - 可视化参数输入界面
   - 支持多种数据类型（address, uint, bool, string等）
   - 实时调用智能合约只读函数
   - 结果格式化展示

3. **函数验证**
   - 自动验证无参数函数是否存在
   - 生成详细的验证报告
   - 帮助诊断ABI匹配问题

4. **历史记录**
   - 自动保存已加载的合约
   - 点击历史记录快速加载
   - 本地存储，最多保存10条

### 界面设计
- 三栏布局：配置区、函数列表、调用结果
- 简约现代的UI设计
- 响应式布局，支持移动端
- 连接状态实时显示

### 快捷功能
- 内置常用合约（USDC、USDT、WBTC、UNI）
- 一键加载合约地址和ABI
- 参数类型智能提示

## 技术栈
- 前端框架：原生HTML/CSS/JavaScript
- Web3库：ethers.js v5.7.2
- 存储：浏览器localStorage

## RPC节点
```
Ethereum主网: https://eth.llamarpc.com
Ethereum Sepolia: https://rpc.sepolia.org
Arbitrum One: https://arb1.arbitrum.io/rpc
Arbitrum Sepolia: https://sepolia-rollup.arbitrum.io/rpc
```

## 使用方式

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
npm start
```

### 直接使用
在浏览器中打开 `index.html` 文件即可使用。

## 注意事项
- 只支持调用view和pure类型的只读函数
- 确保RPC节点可用
- ABI必须是有效的JSON数组格式
- 建议使用"验证函数"功能检查ABI匹配度

## 未来规划
- 支持写入函数（需要钱包连接）
- 支持更多EVM链
- 添加单元测试
- 支持批量调用
- 添加调用历史记录
