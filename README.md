# Web3 ABI 调用工具

一个用于EVM链智能合约调用测试的Web工具，支持Ethereum、Ethereum Sepolia、Arbitrum One和Arbitrum Sepolia网络。

## 功能特性

- 支持多个EVM网络
  - Ethereum 主网
  - Ethereum Sepolia 测试网
  - Arbitrum One 主网
  - Arbitrum Sepolia 测试网

- ABI 导入与解析
  - 导入标准ABI JSON格式
  - 自动解析合约函数列表
  - 显示函数状态可变性和参数信息

- 函数调用
  - 可视化参数输入界面
  - 实时调用智能合约函数
  - 结果展示与格式化

- 现代化界面
  - 响应式设计
  - 暗色主题
  - 实时状态指示

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置 RPC 节点（可选）

如需使用 Alchemy 节点，复制示例配置文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的 Alchemy API Key：

```
ALCHEMY_API_KEY=your_alchemy_api_key_here
```

不配置则使用公共 RPC 节点（无需 API Key）。

### 启动服务

```bash
npm start
```

服务将在 `http://localhost:8080` 启动。

首次启动时会自动生成 `config.js` 配置文件。

### 直接使用

也可以直接在浏览器中打开 `index.html` 文件使用。

## 使用说明

### 1. 选择网络

在左侧面板中选择要连接的EVM网络。

### 2. 输入合约地址

输入要测试的智能合约地址（0x开头的地址）。

### 3. 导入ABI

将合约的ABI JSON数据粘贴到ABI输入框中，然后点击"加载ABI"按钮。

### 4. 选择函数

在右侧面板的函数列表中选择要调用的函数。

### 5. 输入参数

根据函数要求输入相应的参数值。

### 6. 调用函数

点击"调用函数"按钮执行合约调用，结果将在下方显示。

## 支持的数据类型

- 基本类型: `uint`, `int`, `address`, `bool`, `bytes`
- 动态类型: `string`, `bytes32[]`
- 复杂类型: 结构体、数组、映射（通过编码）

## 注意事项

- 只能调用 `view` 和 `pure` 类型的只读函数
- 写入函数需要连接钱包（此版本未实现）
- 确保RPC节点可用且有足够的请求配额
- ABI必须是有效的JSON数组格式

## 技术栈

- 前端框架: 原生HTML/CSS/JavaScript
- Web3库: ethers.js v5.7.2
- RPC服务: Alchemy

## 示例ABI

```json
[
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
]
```

## 许可证

MIT
