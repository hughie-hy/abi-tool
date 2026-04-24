const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');

// 读取 .env 文件
function loadEnv() {
    const envPath = path.join(__dirname, '.env');
    if (!fs.existsSync(envPath)) {
        return {};
    }

    const env = {};
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split('\n').forEach(line => {
        const [key, ...values] = line.split('=');
        if (key && !key.startsWith('#')) {
            env[key.trim()] = values.join('=').trim();
        }
    });
    return env;
}

// AES 加密
function encrypt(text) {
    // 将密钥进行 base64 编码
    const rawKey = 'ChainTool-2024-Web3';
    const encodedKey = Buffer.from(rawKey).toString('base64');
    const encrypted = CryptoJS.AES.encrypt(text, encodedKey);
    return encrypted.toString();
}

// 生成配置文件
function generateConfig() {
    const env = loadEnv();
    const apiKey = env.ALCHEMY_API_KEY || '';

    const networks = {
        'ethereum': {
            name: 'Ethereum',
            rpc: env.ETH_RPC_URL || (apiKey ? `https://eth-mainnet.g.alchemy.com/v2/${apiKey}` : 'https://eth.llamarpc.com'),
            chainId: 1
        },
        'ethereum-sepolia': {
            name: 'Ethereum Sepolia',
            rpc: env.SEPOLIA_RPC_URL || (apiKey ? `https://eth-sepolia.g.alchemy.com/v2/${apiKey}` : 'https://rpc.sepolia.org'),
            chainId: 11155111
        },
        'arbitrum': {
            name: 'Arbitrum One',
            rpc: env.ARBITRUM_RPC_URL || (apiKey ? `https://arb-mainnet.g.alchemy.com/v2/${apiKey}` : 'https://arb1.arbitrum.io/rpc'),
            chainId: 42161
        },
        'arbitrum-sepolia': {
            name: 'Arbitrum Sepolia',
            rpc: env.ARBITRUM_SEPOLIA_RPC_URL || (apiKey ? `https://arb-sepolia.g.alchemy.com/v2/${apiKey}` : 'https://sepolia-rollup.arbitrum.io/rpc'),
            chainId: 421614
        }
    };

    // 对每个 RPC URL 进行 AES 加密
    const encryptedNetworks = {};
    for (const [key, value] of Object.entries(networks)) {
        encryptedNetworks[key] = {
            name: value.name,
            rpc: encrypt(value.rpc),
            chainId: value.chainId
        };
    }

    // 生成 config.js 文件
    const configContent = `// 自动生成的配置文件，RPC URL 已使用 AES 加密
window.__RPC_CONFIG_ENCRYPTED__ = ${JSON.stringify(encryptedNetworks, null, 4)};
`;

    fs.writeFileSync(path.join(__dirname, 'config.js'), configContent);
    console.log('✅ 配置文件已生成: config.js (AES-256-CBC 加密)');

    // 显示使用的配置
    console.log('\n📡 当前 RPC 配置:');
    Object.values(networks).forEach(n => {
        const isAlchemy = n.rpc.includes('alchemy');
        console.log(`  ${n.name}: ${isAlchemy ? '🔐 Alchemy' : '🌐 公共节点'}`);
    });
}

generateConfig();
