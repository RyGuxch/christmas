const DEBUG = true;

function log(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

// 在 script.js 开头添加用户标识生成函数
function generateUserId() {
    // 检查localStorage中是否已有用户ID
    const savedUserId = localStorage.getItem('christmasUserId');
    if (savedUserId) {
        return savedUserId;
    }
    // 如果没有，生成新的ID并保存
    const newUserId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('christmasUserId', newUserId);
    return newUserId;
}

// 为每个会话创建唯一的用户ID
const sessionUserId = generateUserId();

// 添加全局状态控制
const state = {
    isRainbowMode: false,
    isGravityMode: false,
    isTreeColorMode: false,
    chasingPairs: new Set()
};

// 修改雪花生成函数
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    const emojis = ['🎈', '🎉', '🎊', '✨', '💫', '⭐', '🌟', '💥', '🎵', '🎶'];
    snowflake.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 20 + 15 + 'px';
    snowflake.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
    
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
                    console.error('铃铛播放失败:', error);
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
    "🎊 新年快乐，万事如意",
    "🧧 恭喜发财，红包拿来",
    "✨ 愿你新年事事顺心",
    "🎉 祝你新的一年平安喜乐",
    "⭐ 愿你前程似锦，未来可期",
    "🏮 新年新气象，好运马上来",
    "💫 愿你新年梦想成",
    "🎀 祝你新年幸福安康",
    "🌟 愿新的一年充满希望",
    "💝 新年送你一份温暖祝福",
    "🎵 愿新年好运与你相伴",
    "💮 祝你新年事业腾飞"
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
    
    // 计算安全的显示位置
    const safeY = Math.min(y, window.innerHeight - 100); // 确保不会超出底部
    const safeX = Math.min(Math.max(x, 100), window.innerWidth - 100); // 确保不会超出左右边界
    
    // 随机位置偏移
    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = Math.min(20 + Math.random() * 20, 40); // 向下偏移，但限制最大值
    
    blessing.style.left = (safeX + offsetX) + 'px';
    blessing.style.top = (safeY + offsetY) + 'px';
    
    document.querySelector('.blessing-container').appendChild(blessing);
    
    // 动画结束后移除元素
    setTimeout(() => {
        blessing.style.opacity = '0';
        blessing.style.transform = 'translateY(20px) scale(0.8)';
        setTimeout(() => blessing.remove(), 500);
    }, 2500);
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

        // 添加落动画
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
    static characters = new Map();
    static availableEmojis = [
        // 基础表情（不同肤色）
        '👶', '👶🏻', '👶🏼', '👶🏽', '👶🏾', '👶🏿',
        '👧', '👧🏻', '👧🏼', '👧🏽', '👧🏾', '👧🏿',
        '👦', '👦🏻', '👦🏼', '👦🏽', '👦🏾', '👦🏿',
        '👨', '👨🏻', '👨🏼', '👨🏽', '👨🏾', '👨🏿',
        '👩', '👩🏻', '👩🏼', '👩🏽', '👩🏾', '👩🏿',
        
        // 有趣的表情
        '🥳', '🤪', '🤓', '🧐', '🤠', '🥸',
        '😎', '🤡', '👻', '🤖', '🫠', '👽',
        
        // 职业和角色
        '🧙‍♂️', '🧙‍♀️', '🧝‍♂️', '🧝‍♀️', '🦹‍♂️', '🦹‍♀️',
        '🥷', '🥷🏻', '🥷🏼', '🥷🏽', '🥷🏾', '🥷🏿',
        '👨‍🎤', '👩‍🎤', '👨‍🎨', '👩‍🎨',
        
        // 动物
        '🐶', '🐱', '🐰', '🦊', '🐼', '🐨',
        '🦁', '🐯', '🐸', '🦄', '🐲', '🎄',
        
        // 节日相关
        '🎅', '🎅🏻', '🎅🏼', '🎅🏽', '🎅🏾', '🎅🏿',
        '🤶', '🤶🏻', '🤶🏼', '🤶🏽', '🤶🏾', '🤶🏿',
        '🦌', '⛄', '🎄',
        
        // 表情和情绪
        '😊', '🥰', '😇', '🤩', '🥳', '🤪',
        '🤓', '😎', '🥸', '🤯', '🤠', '😈',
        
        // 幻想角色
        '🧚‍♂️', '🧚‍♀️', '🧛‍♂️', '🧛‍♀️', '🧜‍♂️', '🧜‍♀️',
        '🧞‍♂️', '🧟‍♀️', '🫎', '🧟‍♀️', '👼', '👻'
    ];

    static create(message, senderId) {
        // 检查是否已经存在这个发送者的角色
        const existingCharacter = Character.characters.get(senderId);
        if (existingCharacter) {
            existingCharacter.updateMessage(message);
            return existingCharacter;
        }

        // 如果角色不存在，创建新角色并保存到Map中
        const character = new Character(message, senderId);
        Character.characters.set(senderId, character);
        return character;
    }

    constructor(message, senderId = sessionUserId) {
        if (!message) {
            throw new Error('Message is required');
        }
        
        this.senderId = senderId;
        this.messages = [message];
        this.element = null;
        this.bubble = null;
        this.position = null;
        
        // 初始化元素
        this.initializeElement();
        // 显示初始消息
            this.showMessage(message);
    }

    initializeElement() {
        // 检查是否已存在该角色的元素
        const existingElement = document.querySelector(`.character[data-sender-id="${this.senderId}"]`);
        if (existingElement) {
            this.element = existingElement;
            return;
        }

        // 创建元素
        const character = document.createElement('div');
        character.classList.add('character');
        character.setAttribute('data-sender-id', this.senderId);
        character.style.position = 'fixed';
        
        // 加载保存的emoji或使用随机emoji
        const savedEmoji = localStorage.getItem(`character_emoji_${this.senderId}`);
        const randomEmoji = Character.availableEmojis[Math.floor(Math.random() * Character.availableEmojis.length)];
        character.textContent = savedEmoji || randomEmoji;
        
        // 如果是新角色，保存随机选择的emoji
        if (!savedEmoji) {
            localStorage.setItem(`character_emoji_${this.senderId}`, character.textContent);
        }

        // 修改点击事件处理
        character.addEventListener('click', (e) => {
            // 阻止事件冒泡，防止重复触发
            e.stopPropagation();
            
            if (this.senderId === sessionUserId) {
                if (e.button === 2) {
                    e.preventDefault();
                    this.showEmojiSelector(e);
                } else {
                    // 显示自己的操作菜单
                    this.showActionMenu(e, true);
                }
            } else {
                // 显示其他用户操作菜单
                this.showActionMenu(e, false);
            }
        });
        
        // 添加右键菜单监听
        character.addEventListener('contextmenu', (e) => {
            if (this.senderId === sessionUserId) {
                e.preventDefault();
                this.showEmojiSelector(e);
            }
        });

        this.addDragability(character);
        
        document.querySelector('.character-container').appendChild(character);
        this.element = character;

        // 加载保存的位置或设置初始位置
        if (!this.loadPosition()) {
            this.setInitialPosition();
        }

        // 添加触摸事件支持
        let touchStartX = 0;
        let touchStartY = 0;
        let isDragging = false;

        character.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchStartX = e.touches[0].clientX - this.position.x;
            touchStartY = e.touches[0].clientY - this.position.y;
            isDragging = true;
        });

        character.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const x = e.touches[0].clientX - touchStartX;
            const y = e.touches[0].clientY - touchStartY;
            
            // 确保不会超屏幕边界
            const maxX = window.innerWidth - character.offsetWidth;
            const maxY = window.innerHeight - character.offsetHeight;
            
            this.position = {
                x: Math.min(Math.max(0, x), maxX),
                y: Math.min(Math.max(0, y), maxY)
            };
            
            character.style.left = this.position.x + 'px';
            character.style.top = this.position.y + 'px';
        });

        character.addEventListener('touchend', () => {
            isDragging = false;
        });

        // 添加长按事件支持
        let longPressTimer;
        character.addEventListener('touchstart', (e) => {
            longPressTimer = setTimeout(() => {
                this.showActionMenu(e);
            }, 500);
        });

        character.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        });

        character.addEventListener('touchmove', () => {
            clearTimeout(longPressTimer);
        });

        // 在元素初始化完成后设置消息监听
        this.setupMessageListener();
    }

    setInitialPosition() {
        // 获取圣诞树元素的位置
        const tree = document.querySelector('.christmas-tree');
        const treeRect = tree.getBoundingClientRect();
        
        // 获取消息输入框的位置
        const messageInput = document.querySelector('.message-input-container');
        const inputRect = messageInput.getBoundingClientRect();
        
        // 设置初始位置范围（在界面下方区域）
        const minX = 50;
        const maxX = window.innerWidth - 100;
        const minY = window.innerHeight * 0.6; // 从界面60%高度开始
        const maxY = Math.min(window.innerHeight * 0.8, inputRect.top - 100); // 到界面80%高度或输入框上方
        
        // 生成随机位置
        const randomX = minX + Math.random() * (maxX - minX);
        const randomY = minY + Math.random() * (maxY - minY);
        
        // 设置位置
        this.element.style.left = `${randomX}px`;
        this.element.style.top = `${randomY}px`;
        
        // 保存位置
        this.savePosition();
    }

    savePosition() {
        if (!this.element) return;
        
        const position = {
            left: this.element.style.left,
            top: this.element.style.top
        };
        
        try {
            localStorage.setItem(`character_position_${this.senderId}`, JSON.stringify(position));
        } catch (error) {
            console.error('保存位置失败:', error);
        }
    }

    loadPosition() {
        try {
            const savedPosition = localStorage.getItem(`character_position_${this.senderId}`);
            if (savedPosition) {
                const position = JSON.parse(savedPosition);
                this.element.style.left = position.left;
                this.element.style.top = position.top;
                return true;
            }
        } catch (error) {
            console.error('加载位置失败:', error);
        }
        return false;
    }

    addDragability(element) {
        let isDragging = false;
        let startX, startY;
        let startLeft, startTop;
        let movedDistance = 0; // 添加移动距离跟踪

        element.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            isDragging = false; // 初始设置为非拖动状态
            movedDistance = 0; // 重置移动距离
            startX = e.clientX;
            startY = e.clientY;
            
            const rect = element.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            
            element.style.cursor = 'grabbing';
            element.style.transition = 'none';
            element.style.animation = 'none';
            element.classList.add('dragging');

            const moveHandler = (e) => {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                
                // 计算移动距离
                movedDistance = Math.sqrt(dx * dx + dy * dy);
                
                // 如果移动距离超过阈值，标记为拖动
                if (movedDistance > 5) {
                    isDragging = true;
                }
                
                if (!isDragging) return;
                
                const newLeft = startLeft + dx;
                const newTop = startTop + dy;
                
                const maxX = window.innerWidth - element.offsetWidth;
                const maxY = window.innerHeight - element.offsetHeight;
                
                const boundedLeft = Math.max(0, Math.min(maxX, newLeft));
                const boundedTop = Math.max(0, Math.min(maxY, newTop));
                
                element.style.left = `${boundedLeft}px`;
                element.style.top = `${boundedTop}px`;
                
                e.preventDefault();
            };

            const upHandler = () => {
                element.style.cursor = 'grab';
                element.style.transition = '';
                element.style.animation = '';
                element.classList.remove('dragging');
                
                // 只有没拖动才显示历史记录
                if (!isDragging && movedDistance < 5) {
                    this.showHistory();
                }
                
                // 只有在拖动时才保存位置
                if (isDragging) {
                    this.savePosition();
                }
                
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
            };

            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', upHandler);
        });

        element.addEventListener('dragstart', (e) => e.preventDefault());
    }

    updateMessage(text) {
        this.messages.push(text);
        this.showMessage(text);
    }

    showMessage(text) {
        // 移除现有气泡
        if (this.bubble && this.bubble.parentNode) {
            this.bubble.remove();
        }

        // 创建新的消息气泡
        this.bubble = document.createElement('div');
        this.bubble.classList.add('message-bubble');
        this.bubble.textContent = text;
        
        // 将气泡添加到角色元素中
        this.element.appendChild(this.bubble);

        // 2秒后隐藏气泡
        setTimeout(() => {
            if (this.bubble) {
                this.bubble.style.opacity = '0';
                this.bubble.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    if (this.bubble && this.bubble.parentNode) {
                        this.bubble.remove();
                        this.bubble = null;
                    }
                }, 300);
            }
        }, 2000);
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

    showHistory() {
        // 确保先关闭其他可能打开的界面
        const existingMenu = document.querySelector('.character-action-menu');
        const privateChatModal = document.querySelector('.private-chat-modal');
        if (existingMenu) {
            existingMenu.remove();
        }
        if (privateChatModal) {
            privateChatModal.style.display = 'none';
        }

        const modal = document.querySelector('.history-modal');
        const messageHistory = modal.querySelector('.message-history');
        const clearAllBtn = modal.querySelector('.clear-all-btn');
        
        // 清空现有内容
        messageHistory.innerHTML = '';
        
        // 显示消息历史
        this.messages.forEach((msg, index) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            
            // 创建消息文本容器
            const messageText = document.createElement('span');
            messageText.className = 'message-text';
            messageText.textContent = msg;
            messageElement.appendChild(messageText);
            
            // 只有当前用户可删除自己的消息
            if (this.senderId === sessionUserId) {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-message';
                deleteBtn.innerHTML = '×';
                deleteBtn.title = '删除此消息';
                
                // 删除单条消息
                deleteBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    if (confirm('确定要删除这条消息吗？')) {
                        try {
                            // 从全局取 Firebase 函数
                            const { ref, get, remove } = await import('https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js');
                            
                            // 查找并删除消息
                            const messagesRef = ref(window.database, 'messages');
                            const snapshot = await get(messagesRef);
                            
                            if (snapshot.exists()) {
                                const messages = snapshot.val();
                                for (const [key, message] of Object.entries(messages)) {
                                    if (message.senderId === this.senderId && message.text === msg) {
                                        // 删除消息
                                        await remove(ref(window.database, `messages/${key}`));
                                        
                                        // 更新本地状态
                                        this.messages.splice(index, 1);
                                        messageElement.style.animation = 'itemDisappear 0.3s ease-out forwards';
                                        
                                        setTimeout(() => {
                                            messageElement.remove();
                                            // 如果没有消息了，关闭模态框并移除角色
                                            if (this.messages.length === 0) {
                                                if (this.element && this.element.parentNode) {
                                                    this.element.remove();
                                                }
                                                Character.characters.delete(this.senderId);
                                                modal.style.display = 'none';
                                            }
                                        }, 300);
                                        
                                        return;
                                    }
                                }
                            }
                            throw new Error('找不到要删除的消息');
                        } catch (error) {
                            console.error('删除失败:', error);
                            alert('删除失败，请重试');
                        }
                    }
                });
                
                messageElement.appendChild(deleteBtn);
            }
            
            messageHistory.appendChild(messageElement);
        });

        // 修改清空全部按钮的显示逻辑和功能
        if (this.senderId === sessionUserId) {
            clearAllBtn.style.display = 'block';
            clearAllBtn.onclick = async () => {
                if (confirm('要清空所有消息吗？此操作不可恢复！')) {
                    try {
                        // 导入所需的 Firebase 函数
                        const { ref, get, remove, getDatabase } = await import('https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js');
                        const database = getDatabase();
                        const messagesRef = ref(database, 'messages');
                        
                        // 获取所有消息
                        const snapshot = await get(messagesRef);
                        if (snapshot.exists()) {
                            const messages = snapshot.val();
                            const deletePromises = [];
                            
                            // 找出属于当前用户所有消息
                            Object.entries(messages).forEach(([key, message]) => {
                                if (message.senderId === this.senderId) {
                                    deletePromises.push(remove(ref(database, `messages/${key}`)));
                                }
                            });
                            
                            // 等待所有删除操作完成
                            await Promise.all(deletePromises);
                            
                            // 更新本地状态
                            this.messages = [];
                            messageHistory.innerHTML = '';
                            
                            // 如果没有消息了，关闭模态框并移除角色
                            if (this.element && this.element.parentNode) {
                                this.element.remove();
                            }
                            Character.characters.delete(this.senderId);
                            modal.style.display = 'none';
                            
                            // 示户
                            alert('消息已清空');
                        }
                    } catch (error) {
                        console.error('清空消息失败:', error);
                        alert('清空失败，请重试');
                    }
                }
            };
        } else {
            clearAllBtn.style.display = 'none';
        }

        modal.style.display = 'flex';
    }

    showEmojiSelector(event) {
        // 移除现有的选择器
        const existingSelector = document.querySelector('.emoji-selector');
        if (existingSelector) {
            existingSelector.remove();
        }

        // 创建emoji选择器
        const selector = document.createElement('div');
        selector.classList.add('emoji-selector');
        
        // 添加所有可用emoji
        Character.availableEmojis.forEach(emoji => {
            const emojiOption = document.createElement('span');
            emojiOption.textContent = emoji;
            emojiOption.addEventListener('click', () => {
                this.setEmoji(emoji);
                selector.remove();
            });
            selector.appendChild(emojiOption);
        });

        // 设置选择器位置
        selector.style.position = 'fixed';
        selector.style.left = `${event.clientX}px`;
        selector.style.top = `${event.clientY}px`;

        // 添加到页面
        document.body.appendChild(selector);

        // 点击其他地方关闭选择器
        const closeSelector = (e) => {
            if (!selector.contains(e.target)) {
                selector.remove();
                document.removeEventListener('click', closeSelector);
            }
        };
        setTimeout(() => {
            document.addEventListener('click', closeSelector);
        }, 0);
    }

    setEmoji(emoji) {
        if (!this.element) return;
        // 直接设置文本内容，不创建新元素
        this.element.textContent = emoji;
        localStorage.setItem(`character_emoji_${this.senderId}`, emoji);
    }

    loadEmoji() {
        try {
            return localStorage.getItem(`character_emoji_${this.senderId}`);
        } catch (error) {
            console.error('加载emoji失败:', error);
            return null;
        }
    }

    // 添加私聊相关方法
    async openPrivateChat() {
        try {
            // 确保用户已认证
            const { getAuth, signInAnonymously } = await import('https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js');
            const auth = getAuth();
            
            // 如果用户未登录，行匿名登录
            if (!auth.currentUser) {
                await signInAnonymously(auth);
            }

            // 确保先关闭其他可能打开的界面
            const existingMenu = document.querySelector('.character-action-menu');
            const historyModal = document.querySelector('.history-modal');
            if (existingMenu) {
                existingMenu.remove();
            }
            if (historyModal) {
                historyModal.style.display = 'none';
            }

            const modal = document.querySelector('.private-chat-modal');
            const chatWith = modal.querySelector('.chat-with');
            const messagesContainer = modal.querySelector('.chat-messages');
            const input = modal.querySelector('.chat-input');
            const sendButton = modal.querySelector('.send-chat');
            
            // 设置聊天对象信息
            chatWith.textContent = `正在与 ${this.element.textContent} 聊天`;
            
            // 清空消息容器和输入框
            messagesContainer.innerHTML = '';
            input.value = '';
            
            // 加载历史消息
            await this.loadPrivateMessages(messagesContainer);
            
            // 显示模态框
            modal.style.display = 'flex';
            input.focus();

            // 确保在模态框显示后立即滚动到底部
            requestAnimationFrame(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
            
            // 修改发送消息处理
            const sendMessage = async () => {
                const text = input.value.trim();
                if (!text) return;
                
                // 立即清空输入框并保持焦点
                const messageText = text;
                input.value = '';
                input.focus();
                
                try {
                    await this.sendPrivateMessage(messageText);
                    // 发送后滚动到底部
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } catch (error) {
                    console.error('发送私聊消息失败:', error);
                    alert('发送失败，请重试');
                    input.value = messageText;
                }
            };
            
            // 绑定发送按钮事件
            sendButton.onclick = sendMessage;
            
            // 绑定回车发送
            input.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            };
            
            // 关闭按钮处理
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.onclick = () => {
                modal.style.display = 'none';
                // 移除消息监听器
                if (this.privateMessageListener) {
                    this.privateMessageListener();
                    this.privateMessageListener = null;
                }
            };

            // 点击模态框外部关闭
            modal.onclick = (e) => {
                if (e.target === modal) {
                    closeBtn.click();
                }
            };

            // 打开私聊窗口时清除未读提示
            this.clearUnreadNotification();

            // 设置消息为读
            await this.markMessagesAsRead();
        } catch (error) {
            console.error('打开私聊失败:', error);
            alert('打开私聊失败，请重试');
        }
    }

    async sendPrivateMessage(text) {
        if (!text.trim()) return;

        try {
            const { getDatabase, ref, push, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js');
            const database = getDatabase();
            const chatId = this.getChatId();
            const messageRef = ref(database, `private-messages/${chatId}`);
            
            // 用当前客户端时间作为临时时间戳
            const clientTimestamp = Date.now();
            
            // 发送消息
            await push(messageRef, {
                text: text.trim(),
                senderId: sessionUserId,
                timestamp: clientTimestamp,
                serverTimestamp: serverTimestamp(),
                read: false
            });
            
            // 添加未读提示
            await this.addUnreadNotification();
            
            // 滚动到底部
            const messagesContainer = document.querySelector('.chat-messages');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        } catch (error) {
            console.error('发送私聊消息失败:', error);
            throw error;
        }
    }

    async loadPrivateMessages(messagesContainer) {
        try {
            const { getDatabase, ref, onChildAdded, query, orderByChild } = await import('https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js');
            const db = getDatabase();
            const chatId = this.getChatId();
            const messagesRef = ref(db, `private-messages/${chatId}`);
            
            // 清除现有的监听器
            if (this.privateMessageListener) {
                this.privateMessageListener();
            }
            
            // 按时间戳排序
            const messagesQuery = query(messagesRef, orderByChild('timestamp'));
            
            this.privateMessageListener = onChildAdded(messagesQuery, (snapshot) => {
                const message = snapshot.val();
                if (!message) return;
                
                const messageElement = document.createElement('div');
                messageElement.className = `chat-message ${message.senderId === sessionUserId ? 'sent' : 'received'}`;
                
                // 添加消息内容
                const contentElement = document.createElement('div');
                contentElement.className = 'message-content';
                contentElement.textContent = message.text;
                messageElement.appendChild(contentElement);
                
                // 添加时间戳
                const timeElement = document.createElement('span');
                timeElement.className = 'message-time';
                
                const now = new Date();
                const messageDate = new Date(message.timestamp);
                
                // 如果是今天的消息
                if (messageDate.toDateString() === now.toDateString()) {
                    timeElement.textContent = messageDate.toLocaleTimeString('zh-CN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });
                } else {
                    // 如果是昨天或更早的消息
                    timeElement.classList.add('long-timestamp');
                    
                    // 如果是昨天
                    const yesterday = new Date(now);
                    yesterday.setDate(yesterday.getDate() - 1);
                    if (messageDate.toDateString() === yesterday.toDateString()) {
                        timeElement.textContent = `昨天 ${messageDate.toLocaleTimeString('zh-CN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}`;
                    } else {
                        // 其他日期
                        timeElement.textContent = messageDate.toLocaleString('zh-CN', {
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        });
                    }
                }
                
                messageElement.appendChild(timeElement);
                messagesContainer.appendChild(messageElement);
                
                // 添加滚动到底部
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });

            // 初始加载完成后也滚动到底部
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('加载私聊消息失败:', error);
        }
    }

    async addUnreadNotification() {
        try {
            const { ref, push, getDatabase, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js');
            const database = getDatabase();
            const notificationRef = ref(database, `notifications/${this.senderId}`);
            
            await push(notificationRef, {
                type: 'private_message',
                from: sessionUserId,
                timestamp: serverTimestamp(),
                read: false
            });
        } catch (error) {
            console.error('添加通知失败:', error);
        }
    }

    getChatId() {
        const ids = [sessionUserId, this.senderId].sort();
        return `${ids[0]}_${ids[1]}`;
    }

    // 显示未读通知
    showUnreadNotification() {
        if (!this.element) return; // 确保元素存在
        
        const notification = this.element.querySelector('.chat-notification');
        if (!notification) {
            // 创建新的通知元素
            const notification = document.createElement('div');
            notification.className = 'chat-notification';
            notification.textContent = '1';
            this.element.appendChild(notification);
        } else {
            // 获取当前数量并增加
            const currentCount = parseInt(notification.textContent) || 0;
            notification.textContent = currentCount + 1;
        }
    }

    // 清除未读消息提示
    clearUnreadNotification() {
        const notification = this.element.querySelector('.chat-notification');
        if (notification) {
            notification.remove();
        }
    }

    // 添加显示操作菜单的方法
    showActionMenu(event, isCurrentUser) {
        // 移除现有的菜单和可能存在的历史消息模态框
        const existingMenu = document.querySelector('.character-action-menu');
        const historyModal = document.querySelector('.history-modal');
        if (existingMenu) {
            existingMenu.remove();
        }
        if (historyModal) {
            historyModal.style.display = 'none';
        }

        // 创建菜单
        const menu = document.createElement('div');
        menu.className = 'character-action-menu';
        
        // 根据是否是当前用户设置不同的菜单选项
        const options = isCurrentUser ? [
            {
                text: '查看历史消息',
                icon: '📜',
                action: () => this.showHistory()
            },
            {
                text: '更换表情',
                icon: '😊',
                action: (e) => this.showEmojiSelector(e)
            }
        ] : [
            {
                text: '查看历史消息',
                icon: '📜',
                action: () => this.showHistory()
            },
            {
                text: '发起私聊',
                icon: '💬',
                action: () => this.openPrivateChat()
            }
        ];

        options.forEach(option => {
            const item = document.createElement('div');
            item.className = 'menu-item';
            item.innerHTML = `
                <span class="menu-icon">${option.icon}</span>
                <span class="menu-text">${option.text}</span>
            `;
            item.addEventListener('click', (e) => {
                // 阻止事件冒泡
                e.stopPropagation();
                // 先移除菜单
                menu.remove();
                // 延迟执行操作，确保菜单已完全关闭
                setTimeout(() => {
                    option.action(e);
                }, 50);
            });
            menu.appendChild(item);
        });

        // 设置菜单位置
        const rect = this.element.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.left = `${rect.left}px`;
        menu.style.top = `${rect.top - menu.offsetHeight - 10}px`;

        // 确保单不会超出屏幕边界
        const menuRect = menu.getBoundingClientRect();
        if (menuRect.right > window.innerWidth) {
            menu.style.left = `${window.innerWidth - menuRect.width - 10}px`;
        }
        if (menuRect.top < 0) {
            menu.style.top = `${rect.bottom + 10}px`;
        }

        // 添加到页面
        document.body.appendChild(menu);

        // 点击其他地方关闭菜单
        const closeMenu = (e) => {
            if (!menu.contains(e.target) && e.target !== this.element) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 0);

        // 优化移动端菜单位置
        if ('ontouchstart' in window) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const menuRect = menu.getBoundingClientRect();
            
            // 确保菜单不会超出屏幕
            if (menuRect.right > screenWidth) {
                menu.style.left = `${screenWidth - menuRect.width - 10}px`;
            }
            if (menuRect.top < 0) {
                menu.style.top = `${rect.bottom + 10}px`;
            }
            if (menuRect.bottom > screenHeight) {
                menu.style.top = `${rect.top - menuRect.height - 10}px`;
            }
        }
    }

    // 添加标记消息为已读的方法
    async markMessageAsRead(messageKey) {
        try {
            const { getDatabase, ref, update } = await import('https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js');
            const db = getDatabase();
            const chatId = this.getChatId();
            
            // 更新消息的已读状态
            const updates = {};
            updates[`private-messages/${chatId}/${messageKey}/read`] = true;
            await update(ref(db), updates);
        } catch (error) {
            console.error('标记消息已读失败:', error);
        }
    }

    // 添加批量标记消息已读的方法
    async markMessagesAsRead() {
        try {
            const { getDatabase, ref, get, update } = await import('https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js');
            const db = getDatabase();
            const chatId = this.getChatId();
            const messagesRef = ref(db, `private-messages/${chatId}`);
            
            // 获取所有消息
            const snapshot = await get(messagesRef);
            if (!snapshot.exists()) return;
            
            // 构建更新对象
            const updates = {};
            snapshot.forEach(child => {
                const message = child.val();
                if (message.senderId !== sessionUserId && !message.read) {
                    updates[`private-messages/${chatId}/${child.key}/read`] = true;
                }
            });
            
            // 如果有需要更新消息，执行更新
            if (Object.keys(updates).length > 0) {
                await update(ref(db), updates);
            }
        } catch (error) {
            console.error('批量标记消息已读失败:', error);
        }
    }

    // 修改 setupMessageListener 方法
    setupMessageListener() {
        import('https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js')
            .then(({ getDatabase, ref, onChildAdded, get, onValue }) => {
                const db = getDatabase();
                const chatId = this.getChatId();
                const messagesRef = ref(db, `private-messages/${chatId}`);

                // 使用 onValue 替代 get，这样以实时响应消息状态的变化
                onValue(messagesRef, (snapshot) => {
                    if (snapshot.exists()) {
                        let unreadCount = 0;
                        snapshot.forEach((child) => {
                            const message = child.val();
                            if (message.senderId !== sessionUserId && !message.read) {
                                unreadCount++;
                            }
                        });
                        
                        if (unreadCount > 0) {
                            const notification = this.element.querySelector('.chat-notification');
                            if (notification) {
                                notification.textContent = unreadCount;
                            } else {
                                const notification = document.createElement('div');
                                notification.className = 'chat-notification';
                                notification.textContent = unreadCount;
                                this.element.appendChild(notification);
                            }
                        } else {
                            this.clearUnreadNotification();
                        }
                    }
                });

                // 监听新消息
                onChildAdded(messagesRef, (snapshot) => {
                    const message = snapshot.val();
                    // 只有新消息且未读时才更新通知
                    if (message.senderId !== sessionUserId && !message.read && 
                        message.timestamp > Date.now() - 1000) {
                        this.showUnreadNotification();
                    }
                });
            })
            .catch(error => {
                console.error('设置消息监听失败:', error);
            });
    }

    // 添加时间格式化方法
    formatMessageTime(timestamp) {
        // 处理 serverTimestamp 的情况
        if (!timestamp) {
            return '刚刚';
        }
        
        // 如果是 Firebase 的 serverTimestamp，需要转换为毫秒
        const date = new Date(typeof timestamp === 'number' ? timestamp : timestamp.toMillis());
        const now = new Date();
        
        // 如果是今天的消息，只显示时间
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString('zh-CN', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false
            });
        }
        
        // 如果是昨天的消息
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            const timeText = `昨天 ${date.toLocaleTimeString('zh-CN', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false
            })}`;
            return `<span class="message-time long-timestamp">${timeText}</span>`;
        }
        
        // 其他日期显示完整日期和时间
        const timeText = date.toLocaleString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        return `<span class="message-time long-timestamp">${timeText}</span>`;
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

    // 听回车键
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // 监发送按钮点击
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

// 添加菜单控制
let menuTimeout;
const menuBar = document.querySelector('.menu-bar');

// 创建菜单触发区域
const menuTrigger = document.createElement('div');
menuTrigger.className = 'menu-trigger';
document.body.appendChild(menuTrigger);

// 监听鼠标移动
document.addEventListener('mousemove', (e) => {
    if (e.clientY < 20) {
        // 鼠标移动到顶部，显示菜单
        menuBar.classList.remove('hidden');
        clearTimeout(menuTimeout);
    } else if (e.clientY > 50) {
        // 鼠标移开，延迟隐藏菜单
        clearTimeout(menuTimeout);
        menuTimeout = setTimeout(() => {
            menuBar.classList.add('hidden');
        }, 500);
    }
});

// 监听菜单栏悬停
menuBar.addEventListener('mouseenter', () => {
    clearTimeout(menuTimeout);
    menuBar.classList.remove('hidden');
});

menuBar.addEventListener('mouseleave', () => {
    menuTimeout = setTimeout(() => {
        menuBar.classList.add('hidden');
    }, 500);
});

// 初始状态设为显示
menuBar.classList.remove('hidden');

// 3秒后自动隐藏
setTimeout(() => {
    menuBar.classList.add('hidden');
}, 2000); 

// 添加音乐管理功能
function initMusicManagement() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabs = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // 更新标签按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新内容显示
            tabs.forEach(tab => {
                tab.style.display = tab.id === `${tabName}Tab` ? 'block' : 'none';
            });
            
            // 果切到音乐标签，加载音乐列表
            if (tabName === 'music') {
                loadMusicList();
            }
        });
    });
}

async function loadMusicList() {
    const musicList = document.querySelector('.music-list');
    const snapshot = await get(ref(database, 'music'));
    
    if (snapshot.exists()) {
        musicList.innerHTML = '';
        const music = snapshot.val();
        
        Object.entries(music).forEach(([key, data]) => {
            const item = document.createElement('div');
            item.className = 'music-item';
            item.innerHTML = `
                <div class="music-info">
                    <div class="music-name">${data.name}</div>
                    <div class="music-meta">
                        上传时间: ${new Date(data.uploadTime).toLocaleString()}
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteMusic('${key}', '${data.name}')">删除</button>
            `;
            musicList.appendChild(item);
        });
    } else {
        musicList.innerHTML = '<div class="no-music">暂无音乐</div>';
    }
}

async function deleteMusic(key, name) {
    if (confirm(`确定要删除音乐 "${name}" 吗？`)) {
        try {
            // 删除存储中的文件
            const storage = getStorage();
            await deleteObject(ref(storage, `music/${name}`));
            
            // 删除数据库中的记录
            await remove(ref(database, `music/${key}`));
            
            // 重新加载音乐列表
            loadMusicList();
        } catch (error) {
            console.error('删除失败:', error);
            alert('删除失败，请重试');
        }
    }
} 

// 在页面加载时初始化匿名认证
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { getAuth, signInAnonymously } = await import('https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js');
        const auth = getAuth();
        await signInAnonymously(auth);
    } catch (error) {
        console.error('初始化认证失败:', error);
    }
}); 

// 添加移动��手势支持
document.addEventListener('DOMContentLoaded', () => {
    let touchStartY = 0;
    let touchStartTime = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    });

    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        const touchDistance = touchEndY - touchStartY;

        // 快速下滑显示菜单
        if (touchDuration < 300 && touchDistance > 50) {
            const menuBar = document.querySelector('.menu-bar');
            menuBar.classList.remove('hidden');
            clearTimeout(menuTimeout);
            menuTimeout = setTimeout(() => {
                menuBar.classList.add('hidden');
            }, 3000);
        }
    });

    // 优化移动端输入体验
    const input = document.getElementById('messageInput');
    if (input) {
        input.addEventListener('focus', () => {
            // 输入框获得焦点时，滚动到可见区域
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        });
    }
});

// 添加移动端性能优化
function optimizeForMobile() {
    // 减少动画数量
    if ('ontouchstart' in window) {
        const snowContainer = document.querySelector('.snow-container');
        if (snowContainer) {
            clearInterval(snowInterval);
            snowInterval = setInterval(createSnowflake, 500); // 降低雪花生成频率
        }

        // 优化触摸反馈
        document.querySelectorAll('button, .menu-link').forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
            });
            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }
}

// 页面加载时初始化移动端优化
window.addEventListener('load', optimizeForMobile); 

// 添加键盘控制
document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'r':
            state.isRainbowMode = !state.isRainbowMode;
            document.body.style.animation = state.isRainbowMode ? 
                'rainbow-bg 5s linear infinite' : 'none';
            break;
        case 'g':
            state.isGravityMode = !state.isGravityMode;
            document.querySelectorAll('.character').forEach(char => {
                if (state.isGravityMode) {
                    const bottom = window.innerHeight - 100;
                    char.style.transition = 'top 1s ease';
                    char.style.top = `${bottom}px`;
                } else {
                    char.style.transition = 'top 1s ease';
                    const savedPosition = localStorage.getItem(`character_position_${char.dataset.senderId}`);
                    if (savedPosition) {
                        const position = JSON.parse(savedPosition);
                        char.style.top = position.top;
                    }
                }
            });
            break;
        case 'c':
            state.isTreeColorMode = !state.isTreeColorMode;
            const tree = document.querySelector('.tree-body');
            if (tree) {
                if (state.isTreeColorMode) {
                    startTreeColorChange();
                } else {
                    stopTreeColorChange();
                }
            }
            break;
        case 'b':
            createCrazyAnimation();
            break;
    }
});

// 角色追逐效果
function startCharacterChasing() {
    setInterval(() => {
        const characters = Array.from(document.querySelectorAll('.character'));
        if (characters.length < 2) return;

        if (Math.random() < 0.3 && state.chasingPairs.size < 2) {
            const chaser = characters[Math.floor(Math.random() * characters.length)];
            const target = characters[Math.floor(Math.random() * characters.length)];
            
            if (chaser !== target && !state.chasingPairs.has(chaser) && !state.chasingPairs.has(target)) {
                state.chasingPairs.add(chaser);
                state.chasingPairs.add(target);
                
                let startPos = {
                    x: parseFloat(chaser.style.left),
                    y: parseFloat(chaser.style.top)
                };

                const chase = () => {
                    if (!state.chasingPairs.has(chaser)) return;

                    const targetRect = target.getBoundingClientRect();
                    const chaserRect = chaser.getBoundingClientRect();
                    
                    const dx = targetRect.left - chaserRect.left;
                    const dy = targetRect.top - chaserRect.top;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        triggerInteraction(chaser, target);
                        return;
                    }
                    
                    // 更平滑的移动
                    const speed = 3;
                    const vx = (dx / distance) * speed;
                    const vy = (dy / distance) * speed;
                    
                    const newX = parseFloat(chaser.style.left) + vx;
                    const newY = parseFloat(chaser.style.top) + vy;
                    
                    chaser.style.left = `${newX}px`;
                    chaser.style.top = `${newY}px`;
                    
                    requestAnimationFrame(chase);
                };
                
                chase();
            }
        }
    }, 3000);
}

// 角色互动动画
function triggerInteraction(char1, char2) {
    const animations = ['crazySpinDance', 'crazyShakeDance', 'crazyBounceDance', 'crazyFlipDance'];
    const animation = animations[Math.floor(Math.random() * animations.length)];
    
    // 添加跳舞类以暂停悬浮
    char1.classList.add('dancing');
    char2.classList.add('dancing');
    
    // 随机互动消息
    const interactions = [
        ['Hi~', 'Hello!'],
        ['跳舞吗？', '好啊！'],
        ['新年快乐！', '你也是！'],
        ['一起玩！', '来啊！'],
        ['恭喜发财！', '红包拿来！']
    ];
    const interaction = interactions[Math.floor(Math.random() * interactions.length)];
    
    // 显示对话气泡
    showMessageBubble(char1, interaction[0]);
    setTimeout(() => showMessageBubble(char2, interaction[1]), 500);
    
    // 播放动画
    char1.style.animation = `${animation} 2s ease`;
    char2.style.animation = `${animation} 2s ease`;
    
    // 添加互动特效
    createInteractionEffect(char1, char2);
    
    setTimeout(() => {
        // 返回原位并恢复悬浮动画
        returnToOriginalPosition(char1);
        returnToOriginalPosition(char2);
        state.chasingPairs.delete(char1);
        state.chasingPairs.delete(char2);
    }, 2000);
}

// 显示对话气泡
function showMessageBubble(char, text) {
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;
    char.appendChild(bubble);
    
    setTimeout(() => bubble.remove(), 2000);
}

// 创建互动特效
function createInteractionEffect(char1, char2) {
    const effects = ['✨', '💫', '🌟', '💕', '🎵'];
    const positions = getPositionsBetween(char1, char2);
    
    positions.forEach((pos, i) => {
        setTimeout(() => {
            const effect = document.createElement('div');
            effect.className = 'dance-effect';
            effect.textContent = effects[Math.floor(Math.random() * effects.length)];
            effect.style.left = `${pos.x}px`;
            effect.style.top = `${pos.y}px`;
            document.body.appendChild(effect);
            
            setTimeout(() => effect.remove(), 1000);
        }, i * 100);
    });
}

// 计算两个角色之间的位置点
function getPositionsBetween(char1, char2) {
    const rect1 = char1.getBoundingClientRect();
    const rect2 = char2.getBoundingClientRect();
    const positions = [];
    const steps = 5;
    
    for (let i = 0; i <= steps; i++) {
        positions.push({
            x: rect1.left + (rect2.left - rect1.left) * (i / steps),
            y: rect1.top + (rect2.top - rect1.top) * (i / steps)
        });
    }
    
    return positions;
}

// 返回原位
function returnToOriginalPosition(char) {
    const savedPosition = localStorage.getItem(`character_position_${char.dataset.senderId}`);
    if (savedPosition) {
        const position = JSON.parse(savedPosition);
        char.style.transition = 'all 1s ease';
        char.style.left = position.left;
        char.style.top = position.top;
        
        // 恢复原有的悬浮动画
        setTimeout(() => {
            char.style.transition = '';
            char.classList.remove('dancing');
            char.style.animation = 'float 3s ease-in-out infinite';
        }, 1000);
    }
}

// 修改舞蹈动画相关的样式
const danceStyles = document.createElement('style');
danceStyles.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(1); }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(-15px) rotate(-15deg); }
        75% { transform: translateX(15px) rotate(15deg); }
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-50px) scale(1.2) rotate(180deg); }
    }

    @keyframes flip {
        0% { transform: perspective(400px) rotateY(0) scale(1); }
        50% { transform: perspective(400px) rotateY(180deg) scale(1.2); }
        100% { transform: perspective(400px) rotateY(360deg) scale(1); }
    }

    .dance-effect {
        position: absolute;
        pointer-events: none;
        font-size: 24px;
        animation: effectFade 1s forwards;
    }

    @keyframes effectFade {
        0% { transform: translateY(0) scale(0); opacity: 0; }
        50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        100% { transform: translateY(-40px) scale(1); opacity: 0; }
    }

    .message-bubble {
        background: rgba(255, 255, 255, 0.9);
        padding: 8px 12px;
        border-radius: 12px;
        font-size: 14px;
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        animation: bubblePop 2s forwards;
        pointer-events: none;
    }

    @keyframes bubblePop {
        0% { transform: translateX(-50%) scale(0); opacity: 0; }
        20% { transform: translateX(-50%) scale(1.2); opacity: 1; }
        80% { transform: translateX(-50%) scale(1); opacity: 1; }
        100% { transform: translateX(-50%) scale(0.8); opacity: 0; }
    }
`;
document.head.appendChild(danceStyles);

// 修改角色的基础样式
const characterStyles = document.createElement('style');
characterStyles.textContent = `
    .character {
        transition: all 0.3s ease;
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
    }

    /* 疯狂旋转舞蹈 */
    @keyframes spinDance {
        0% { transform: scale(1) rotate(0deg) translateY(0); }
        25% { transform: scale(1.4) rotate(180deg) translateY(-40px); }
        50% { transform: scale(0.8) rotate(360deg) translateY(20px); }
        75% { transform: scale(1.2) rotate(540deg) translateY(-30px); }
        100% { transform: scale(1) rotate(720deg) translateY(0); }
    }

    /* 弹跳舞蹈 */
    @keyframes bounceDance {
        0%, 100% { transform: scale(1) translateY(0); }
        25% { transform: scale(1.3) translateY(-50px) rotate(20deg); }
        50% { transform: scale(0.8) translateY(0) rotate(-20deg); }
        75% { transform: scale(1.2) translateY(-30px) rotate(20deg); }
    }

    /* 摇摆舞蹈 */
    @keyframes swingDance {
        0% { transform: translateX(0) rotate(0deg) scale(1); }
        25% { transform: translateX(-30px) rotate(-30deg) scale(1.2); }
        50% { transform: translateX(0) rotate(0deg) scale(0.9); }
        75% { transform: translateX(30px) rotate(30deg) scale(1.2); }
        100% { transform: translateX(0) rotate(0deg) scale(1); }
    }

    /* 疯狂抖动舞蹈 */
    @keyframes crazyShake {
        0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        20% { transform: translate(-20px, -15px) rotate(-20deg) scale(1.3); }
        40% { transform: translate(15px, 10px) rotate(15deg) scale(0.8); }
        60% { transform: translate(-10px, -20px) rotate(-30deg) scale(1.2); }
        80% { transform: translate(20px, 15px) rotate(20deg) scale(0.9); }
    }

    .dance-effect {
        position: absolute;
        pointer-events: none;
        font-size: 24px;
        animation: effectFade 1s forwards;
        z-index: 1000;
    }

    @keyframes effectFade {
        0% { transform: translateY(0) scale(0); opacity: 0; }
        50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        100% { transform: translateY(-40px) scale(1); opacity: 0; }
    }
`;
document.head.appendChild(characterStyles);

// 初始化函数
function initializeDanceEffects() {
    // 移除之前可能存在的事件监听器
    document.removeEventListener('keypress', handleKeyPress);
    // 添加新的事件监听器
    document.addEventListener('keypress', handleKeyPress);
    
    // 初始化所有角色的悬浮效果
    document.querySelectorAll('.character').forEach(char => {
        char.style.animation = 'float 3s ease-in-out infinite';
    });
}

// 键盘事件处理函数
function handleKeyPress(e) {
    if (e.key.toLowerCase() === 'q') {
        state.isDanceMode = !state.isDanceMode;
        document.querySelectorAll('.character').forEach(char => {
            if (state.isDanceMode) {
                startRandomDance(char);
                // 播放音效
                const bellSound = document.getElementById('bellSound');
                if (bellSound) {
                    bellSound.currentTime = 0;
                    bellSound.play().catch(err => console.log('音效播放失败:', err));
                }
            } else {
                stopDanceEffects(char);
                char.style.animation = 'float 3s ease-in-out infinite';
            }
        });
    }
}

// 修改舞蹈效果函数
function startRandomDance(char) {
    if (!char) return;
    
    // 清除之前的效果
    stopDanceEffects(char);
    
    const dances = [
        { name: 'spinDance', duration: 2 },
        { name: 'bounceDance', duration: 1.5 },
        { name: 'swingDance', duration: 1.8 },
        { name: 'crazyShake', duration: 1.6 }
    ];
    
    // 为每个角色随机选择一个舞蹈动画
    const dance = dances[Math.floor(Math.random() * dances.length)];
    char.style.animation = `${dance.name} ${dance.duration}s infinite`;

    const effects = ['🎵', '🎶', '💃', '🕺', '✨', '💫', '🌟', '💥', '🎪', '🎭'];
    
    // 创建持续的特效
    function createEffect() {
        if (!state.isDanceMode) return;

        const effect = document.createElement('div');
        effect.className = 'dance-effect';
        effect.textContent = effects[Math.floor(Math.random() * effects.length)];
        
        const rect = char.getBoundingClientRect();
        const offsetX = Math.random() * 60 - 30;
        const offsetY = Math.random() * 40 - 20;
        
        effect.style.left = `${rect.left + rect.width/2 + offsetX}px`;
        effect.style.top = `${rect.top + rect.height/2 + offsetY}px`;
        effect.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
    }

    // 持续创建特效
    char.effectInterval = setInterval(createEffect, 300);
}

// 停止舞蹈特效
function stopDanceEffects(char) {
    if (char.effectInterval) {
        clearInterval(char.effectInterval);
        char.effectInterval = null;
    }
    
    // 移除所有相关的特效元素
    document.querySelectorAll('.dance-effect').forEach(effect => {
        const rect = char.getBoundingClientRect();
        const effectRect = effect.getBoundingClientRect();
        if (Math.abs(effectRect.left - rect.left) < 100) {
            effect.remove();
        }
    });
}

// 在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeDanceEffects();
});

// 圣诞树变色效果
let treeColorInterval;
function startTreeColorChange() {
    const tree = document.querySelector('.tree-body');
    treeColorInterval = setInterval(() => {
        tree.style.borderBottomColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }, 100);
}

function stopTreeColorChange() {
    clearInterval(treeColorInterval);
    document.querySelector('.tree-body').style.borderBottomColor = '';
}

// 疯狂全屏动画
function createCrazyAnimation() {
    const container = document.createElement('div');
    container.className = 'crazy-animation';
    document.body.appendChild(container);

    // 创建更多的粒子
    for (let i = 0; i < 200; i++) {
        const particle = document.createElement('div');
        particle.className = 'crazy-particle';
        
        // 随机粒子类型
        const types = ['⭐', '✨', '💫', '🌟', '⚡', '🎉', '🎊'];
        particle.textContent = types[Math.floor(Math.random() * types.length)];
        
        // 随机起始位置
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // 随机动画延迟和持续时间
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particle.style.animationDuration = `${1 + Math.random() * 2}s`;
        
        container.appendChild(particle);
    }

    // 播放音效
    const bellSound = document.getElementById('bellSound');
    if (bellSound) {
        bellSound.currentTime = 0;
        bellSound.play().catch(err => console.log('音效播放失败:', err));
    }

    setTimeout(() => container.remove(), 3000);
}

// 添加CSS样式
const crazyStyles = document.createElement('style');
crazyStyles.textContent = `
    @keyframes rainbow-bg {
        0% { background: hsl(0, 80%, 80%); }
        20% { background: hsl(72, 80%, 80%); }
        40% { background: hsl(144, 80%, 80%); }
        60% { background: hsl(216, 80%, 80%); }
        80% { background: hsl(288, 80%, 80%); }
        100% { background: hsl(360, 80%, 80%); }
    }

    .menu-link {
        transition: all 0.3s ease;
    }

    .menu-link:hover {
        animation: menuShake 0.5s infinite;
    }

    @keyframes menuShake {
        0%, 100% { transform: translateX(0) rotate(0); }
        25% { transform: translateX(-5px) rotate(-5deg); }
        75% { transform: translateX(5px) rotate(5deg); }
    }

    .character {
        transition: all 0.3s ease;
    }

    .character:hover {
        transform: scale(1.2) rotate(360deg);
        filter: hue-rotate(360deg);
    }

    .blessing {
        animation: rainbowText 5s linear infinite !important;
    }

    @keyframes rainbowText {
        0% { color: #ff0000; }
        16.666% { color: #ff8000; }
        33.333% { color: #ffff00; }
        50% { color: #00ff00; }
        66.666% { color: #0000ff; }
        83.333% { color: #8000ff; }
        100% { color: #ff0000; }
    }

    .crazy-animation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
    }

    .crazy-particle {
        position: absolute;
        font-size: 24px;
        pointer-events: none;
        animation: particleFly 3s ease-out forwards;
    }

    @keyframes particleFly {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        100% {
            transform: scale(2) rotate(360deg) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;

document.head.appendChild(crazyStyles);

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    startCharacterChasing();
}); 