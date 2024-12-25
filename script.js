const DEBUG = true;

function log(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

// 在 script.js 开头添加用户标识生成函数
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

// 为每个会话创建唯一的用户ID
const sessionUserId = generateUserId();

// 雪花生成
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    
    document.querySelector('.snow-container').appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// 每200ms生成一个雪花
setInterval(createSnowflake, 200);

// 音乐控制
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');

// 修改音乐播放的初始化逻辑
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isMusicPlaying = false;

    // 改为点击按钮时才播放音乐
    musicToggle.addEventListener('click', function() {
        if (!isMusicPlaying) {
            bgMusic.play()
                .then(() => {
                    isMusicPlaying = true;
                    musicToggle.classList.add('playing');
                })
                .catch(error => {
                    console.error('播放失败:', error);
                });
        } else {
            bgMusic.pause();
            isMusicPlaying = false;
            musicToggle.classList.remove('playing');
        }
    });

    // 铃铛声音也需要用户交互后才能播放
    const bellSound = document.getElementById('bellSound');
    function playBellSound() {
        if (bellSound) {
            bellSound.play()
                .catch(error => {
                    console.error('铃铛声播放失败:', error);
                });
        }
    }
});

// 圣诞树灯光效果
function createLights() {
    const lights = document.querySelector('.tree-lights');
    const numberOfLights = 30;
    
    for (let i = 0; i < numberOfLights; i++) {
        const light = document.createElement('div');
        light.classList.add('light');
        light.style.left = Math.random() * 280 - 140 + 'px';
        light.style.top = Math.random() * 280 + 'px';
        light.style.animationDelay = Math.random() * 2 + 's';
        lights.appendChild(light);
    }
}

createLights(); 

// 添加祝福语数组
const blessings = [
    "🎄 圣诞快乐！",
    "🎅 新年好运！",
    "✨ 心想事成！",
    "🎁 平安喜乐！",
    "⭐ 万事如意！",
    "🔔 铃儿响叮当！",
    "❄️ 冬日暖心愿！",
    "🎀 幸福永相伴！"
];

// 处理雪花点击事件
document.querySelector('.snow-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('snowflake')) {
        showBlessing(e.clientX, e.clientY);
    }
});

// 显示祝福语
function showBlessing(x, y) {
    const blessing = document.createElement('div');
    blessing.classList.add('blessing');
    
    // 随机选择祝福语
    const text = blessings[Math.floor(Math.random() * blessings.length)];
    blessing.textContent = text;
    
    // 随机位置偏移
    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 60;
    
    blessing.style.left = (x + offsetX) + 'px';
    blessing.style.top = (y + offsetY) + 'px';
    
    document.querySelector('.blessing-container').appendChild(blessing);
    
    // 动画结束后移除元素
    setTimeout(() => blessing.remove(), 3000);
}

// 星星点击效果
document.querySelector('.star').addEventListener('click', createFireworks);

function createFireworks(e) {
    const colors = ['#ff0', '#f0f', '#0ff', '#ff4d4d', '#4dff4d'];
    
    for (let i = 0; i < 12; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = e.clientX + 'px';
        firework.style.top = e.clientY + 'px';
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];
        firework.style.transform = `rotate(${i * 30}deg)`;
        document.body.appendChild(firework);
        
        setTimeout(() => firework.remove(), 1000);
    }
}

// 添加礼物轨迹效果
class GiftTrail {
    constructor() {
        this.gifts = ['🎁', '🎊', '🧸', '📦', '🎀', '🎈'];
        this.trail = [];
        this.maxTrail = 15; // 增加最大数量
        this.lastPos = { x: 0, y: 0 };
        this.minDistance = 30; // 减小最小距离，使轨迹更密集
        this.container = document.querySelector('.gifts-container');
        
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            const distance = Math.hypot(e.clientX - this.lastPos.x, e.clientY - this.lastPos.y);
            
            if (distance > this.minDistance) {
                this.createGift(e.clientX, e.clientY);
                this.lastPos = { x: e.clientX, y: e.clientY };
            }
        });
    }

    createGift(x, y) {
        const gift = document.createElement('div');
        gift.className = 'gift-trail';
        gift.textContent = this.gifts[Math.floor(Math.random() * this.gifts.length)];
        
        // 随机初始属性
        const scale = 0.5 + Math.random() * 0.5;
        const rotation = Math.random() * 360;
        const fallDistance = 100 + Math.random() * 150; // 随机下落距离
        const fallDuration = 1 + Math.random() * 1; // 随机下落时间
        const horizontalOffset = (Math.random() - 0.5) * 100; // 随机水平偏移
        
        // 设置初始位置和样式
        gift.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg);
            transition: all ${fallDuration}s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 1;
        `;

        this.container.appendChild(gift);
        this.trail.push(gift);

        // 添加下落动画
        requestAnimationFrame(() => {
            gift.style.transform = `
                translate(
                    calc(-50% + ${horizontalOffset}px),
                    calc(-50% + ${fallDistance}px)
                ) 
                scale(${scale * 0.5}) 
                rotate(${rotation + 180}deg)
            `;
            gift.style.opacity = '0';
        });

        // 移除旧的礼物
        if (this.trail.length > this.maxTrail) {
            const oldGift = this.trail.shift();
            oldGift.remove();
        }

        // 动画结束后移除
        setTimeout(() => {
            if (gift.parentNode) {
                gift.remove();
                const index = this.trail.indexOf(gift);
                if (index > -1) {
                    this.trail.splice(index, 1);
                }
            }
        }, fallDuration * 1000);
    }
}

// 添加相应的 CSS 样式
const giftTrailStyles = document.createElement('style');
giftTrailStyles.textContent = `
    .gift-trail {
        position: fixed;
        font-size: 24px;
        pointer-events: none;
        z-index: 1000;
        will-change: transform, opacity;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    @keyframes twinkle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(giftTrailStyles);

// 初始化礼物轨迹
let giftTrail;
window.addEventListener('load', () => {
    giftTrail = new GiftTrail();
});

// 铃铛音效
const bellSound = document.getElementById('bellSound');
const christmasTree = document.querySelector('.christmas-tree');

christmasTree.addEventListener('mouseenter', () => {
    bellSound.currentTime = 0;
    bellSound.play();
    
    // 触发所有灯光闪烁
    document.querySelectorAll('.light').forEach(light => {
        light.style.animation = 'none';
        light.offsetHeight; // 触发重绘
        light.style.animation = 'twinkle 0.5s infinite';
    });
});

christmasTree.addEventListener('mouseleave', () => {
    // 恢复正常闪烁速度
    document.querySelectorAll('.light').forEach(light => {
        light.style.animation = 'twinkle 1s infinite';
    });
});

// 添加用户角色管理
let userCharacter = null;

// 添加数据库管理
const DB_NAME = 'ChristmasDB';
const DB_VERSION = 1;
const STORE_NAME = 'messages';

class Database {
    static async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            
            request.onerror = () => reject(request.error);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
        });
    }

    static async saveCharacter(data) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }

            try {
                const transaction = this.db.transaction([STORE_NAME], 'readwrite');
                const store = transaction.objectStore(STORE_NAME);
                
                const request = store.put(data);
                
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve();
                
                // 确保事务完成
                transaction.oncomplete = () => resolve();
                transaction.onerror = () => reject(transaction.error);
            } catch (error) {
                reject(error);
            }
        });
    }

    static async loadCharacter() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not initialized'));
                return;
            }

            try {
                const transaction = this.db.transaction([STORE_NAME], 'readonly');
                const store = transaction.objectStore(STORE_NAME);
                const request = store.get('character');
                
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
            } catch (error) {
                reject(error);
            }
        });
    }
}

// 修改 Character 类以支持数据持久化
class Character {
    constructor(message) {
        if (!message) {
            throw new Error('Message is required');
        }
        
        this.message = message;
        
        if (userCharacter) {
            // 使用现有角色
            this.element = userCharacter.element;
            this.messages = userCharacter.messages;
            this.messages.push(message);
            this.showMessage(message);
            this.saveToDatabase();
        } else {
            // 创建新角色
            this.messages = [message];
            this.element = this.createElement();
            userCharacter = this;
            
            // 先加载数据，如果有的话
            this.loadFromDatabase().then(() => {
                if (!this.messages.includes(message)) {
                    this.messages.push(message);
                }
                this.showMessage(message);
                this.saveToDatabase();
            });
        }
    }

    async loadFromDatabase() {
        try {
            const data = await Database.loadCharacter();
            if (data) {
                // 恢复保存的位置和消息
                this.element.style.left = data.position.left || '50%';
                this.element.style.top = data.position.top || '70%';
                if (data.messages && data.messages.length > 0) {
                    this.messages = data.messages;
                }
            }
        } catch (error) {
            console.error('Error loading from database:', error);
        }
    }

    async saveToDatabase() {
        try {
            await Database.saveCharacter({
                id: 'character',
                position: {
                    left: this.element.style.left,
                    top: this.element.style.top
                },
                messages: this.messages,
                lastUpdated: new Date()
            });
        } catch (error) {
            console.error('Error saving to database:', error);
        }
    }

    createElement() {
        try {
            const character = document.createElement('div');
            character.classList.add('character');
            
            // 设置初始位置
            character.style.position = 'fixed';
            character.style.left = '50%';
            character.style.top = '70%';
            character.style.transform = 'translate(-50%, -50%)';
            
            // 点击显示历史消息
            character.addEventListener('click', () => this.showHistory());
            
            // 添加拖拽功能
            this.addDragability(character);
            
            document.body.appendChild(character);
            return character;
        } catch (error) {
            console.error('Error creating character:', error);
            return null;
        }
    }

    addDragability(element) {
        let isDragging = false;
        let startX, startY;
        let startLeft, startTop;
        const messageInput = document.querySelector('.message-input-container');

        element.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; // 只响应左键点击
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = element.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            element.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            
            let newLeft = startLeft + dx;
            let newTop = startTop + dy;
            
            // 限制拖动范围
            const elementRect = element.getBoundingClientRect();
            const messageInputRect = messageInput.getBoundingClientRect();
            
            // 防止与消息输入框重叠
            if (!(newLeft + elementRect.width > messageInputRect.left &&
                  newLeft < messageInputRect.right &&
                  newTop + elementRect.height > messageInputRect.top &&
                  newTop < messageInputRect.bottom)) {
                
                // 限制在窗口内
                newLeft = Math.max(0, Math.min(window.innerWidth - elementRect.width, newLeft));
                newTop = Math.max(0, Math.min(window.innerHeight - elementRect.height, newTop));
                
                element.style.left = `${newLeft}px`;
                element.style.top = `${newTop}px`;
                element.style.transform = 'none';
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'grab';
                this.saveToDatabase();
            }
        });

        // 防止拖动时选中文本
        element.addEventListener('dragstart', (e) => e.preventDefault());
    }

    showMessage(text) {
        const bubble = document.createElement('div');
        bubble.classList.add('message-bubble');
        bubble.textContent = text;
        this.element.appendChild(bubble);
        
        // 只让气泡2秒后消失
        setTimeout(() => {
            bubble.style.opacity = '0';
            bubble.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (bubble && bubble.parentNode) {
                    bubble.remove();
                }
            }, 300);
        }, 2000);
    }

    showHistory() {
        const modal = document.querySelector('.history-modal');
        const historyContainer = modal.querySelector('.message-history');
        const clearAllBtn = modal.querySelector('.clear-all-btn');
        
        // 清空现有内容
        historyContainer.innerHTML = '';
        
        // 显示消息历史
        this.messages.forEach((msg, index) => {
            const item = document.createElement('div');
            item.classList.add('history-item');
            
            // 添加消息文本
            const messageText = document.createElement('span');
            messageText.textContent = msg;
            item.appendChild(messageText);
            
            // 添加删除按钮
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-message');
            deleteBtn.innerHTML = '×';
            deleteBtn.title = '删除此消息';
            
            // 删除单条消息
            deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (confirm('确定要删除这条消息吗？')) {
                    this.messages.splice(index, 1);
                    await this.saveToDatabase();
                    item.style.animation = 'itemDisappear 0.3s ease-out forwards';
                    setTimeout(() => item.remove(), 300);
                }
            });
            
            item.appendChild(deleteBtn);
            historyContainer.appendChild(item);
        });
        
        // 清空所有消息
        clearAllBtn.onclick = async () => {
            if (confirm('确定要清空所有消息记录吗？此操作不可恢复！')) {
                this.messages = [];
                await this.saveToDatabase();
                historyContainer.innerHTML = '';
                modal.style.display = 'none';
            }
        };
        
        modal.style.display = 'flex';
    }
}

// 简化消息系统初始化
function initializeMessageSystem() {
    const form = document.querySelector('.message-input-wrapper');
    const input = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendMessage');
    const modal = document.querySelector('.history-modal');
    const closeModal = document.querySelector('.close-modal');

    if (!form || !input || !sendBtn) {
        console.error('Required elements not found');
        return;
    }

    function sendMessage() {
        const message = input.value.trim();
        if (message) {
            try {
                new Character(message);
                input.value = '';
                input.focus();
            } catch (error) {
                console.error('Error in sendMessage:', error);
            }
        }
    }

    // 监听回车键
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // 监听发送按钮点击
    sendBtn.addEventListener('click', sendMessage);

    // 监听表单提交
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        sendMessage();
    });

    // 模态框关闭功能
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// 初始化数据库并启动应用
async function initializeApp() {
    try {
        await Database.init();
        initializeMessageSystem();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// 页面加载完成后初始化
window.addEventListener('load', initializeApp);

// 添加消息消失动画
const styles = document.createElement('style');
styles.textContent = `
    @keyframes itemDisappear {
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(styles); 