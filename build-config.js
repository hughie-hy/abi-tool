const fs = require('fs');
const path = require('path');

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

    // 生成 config.js 文件
    const configContent = `// 自动生成的配置文件，请勿手动编辑
window.__RPC_CONFIG__ = ${JSON.stringify(networks, null, 4)};
`;

    fs.writeFileSync(path.join(__dirname, 'config.js'), configContent);
    console.log('✅ 配置文件已生成: config.js');

    // 显示使用的配置
    console.log('\n📡 当前 RPC 配置:');
    Object.values(networks).forEach(n => {
        const isAlchemy = n.rpc.includes('alchemy');
        console.log(`  ${n.name}: ${isAlchemy ? '🔐 Alchemy' : '🌐 公共节点'}`);
    });
}

generateConfig();
