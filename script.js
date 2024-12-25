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
    "🎄 愿你的圣诞充满欢笑与温暖",
    "🎅 圣诞老人悄悄为你准备了礼物",
    "✨ 愿圣诞星光照亮你的梦想",
    "🎁 这个圣诞有我为你送上祝福",
    "⭐ 愿你的生活像圣诞树一样闪耀",
    "🔔 听，天使在为你唱圣诞颂歌",
    "❄️ 让温暖的祝福像雪花般飘向你",
    "🎀 愿平安喜乐与你相伴",
    "🌟 这个冬天因你的笑容而温暖",
    "🍪 分享一块圣诞姜饼的温馨",
    "🦌 驯鹿已经准备好带来好运",
    "🕯️ 用祝福点亮你的圣诞夜"
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
        '😎', '🤡', '👻', '🤖', '👾', '👽',
        
        // 职业和角色
        '🧙‍♂️', '🧙‍♀️', '🧝‍♂️', '🧝‍♀️', '🦹‍♂️', '🦹‍♀️',
        '🥷', '🥷🏻', '🥷🏼', '🥷🏽', '🥷🏾', '🥷🏿',
        '👨‍🎤', '👩‍🎤', '👨‍🎨', '👩‍🎨',
        
        // 动物
        '🐶', '🐱', '🐰', '🦊', '🐼', '🐨',
        '🦁', '🐯', '🐸', '🦄', '🐲', '🐉',
        
        // 节日相关
        '🎅', '🎅🏻', '🎅🏼', '🎅🏽', '🎅🏾', '🎅🏿',
        '🤶', '🤶🏻', '🤶🏼', '🤶🏽', '🤶🏾', '🤶🏿',
        '🦌', '⛄', '🎄',
        
        // 表情和情绪
        '😊', '🥰', '😇', '🤩', '🥳', '🤪',
        '🤓', '😎', '🥸', '🤯', '🤠', '😈',
        
        // 幻想角色
        '🧚‍♂️', '🧚‍♀️', '🧛‍♂️', '🧛‍♀️', '🧜‍♂️', '🧜‍♀️',
        '🧞‍♂️', '🧞‍♀️', '🧟‍♂️', '🧟‍♀️', '👼', '👻'
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

        // 创建新元素
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

        // 添加事件监听器
        character.addEventListener('click', (e) => {
            if (this.senderId === sessionUserId) {
                if (e.button === 2) {
                    e.preventDefault();
                    this.showEmojiSelector(e);
                } else {
                    this.showHistory();
                }
        } else {
                this.showHistory();
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
                
                // 只有在没有拖动时才显示历史记录
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
            
            // 只有当前用户可以删除自己的消息
            if (this.senderId === sessionUserId) {
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-message');
            deleteBtn.innerHTML = '×';
            deleteBtn.title = '删除此消息';
            
            // 删除单条消息
            deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (confirm('确定要删除这条消息吗？')) {
                        try {
                            // 从全局获取 Firebase 函数
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
                    item.style.animation = 'itemDisappear 0.3s ease-out forwards';
                                        
                                        setTimeout(() => {
                                            item.remove();
                                            if (this.messages.length === 0) {
                                                if (this.element && this.element.parentNode) {
                                                    this.element.remove();
                                                }
                                                Character.characters.delete(this.senderId);
                                                modal.style.display = 'none';
                                            }
                                        }, 300);
                                        
                                        return; // 删除成功后退出
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
            
            item.appendChild(deleteBtn);
            }
            
            historyContainer.appendChild(item);
        });
        
        // 清空按钮只对当前用户的消息可见
        if (this.senderId === sessionUserId) {
            clearAllBtn.style.display = 'block';
        clearAllBtn.onclick = async () => {
            if (confirm('确定要清空所有消息记录吗？此操作不可恢复！')) {
                    try {
                        // 从全局获取 Firebase 函数
                        const { ref, get, remove } = await import('https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js');
                        
                        const messagesRef = ref(window.database, 'messages');
                        const snapshot = await get(messagesRef);
                        
                        if (snapshot.exists()) {
                            const messages = snapshot.val();
                            const deletePromises = [];
                            
                            for (const [key, message] of Object.entries(messages)) {
                                if (message.senderId === this.senderId) {
                                    deletePromises.push(remove(ref(window.database, `messages/${key}`)));
                                }
                            }
                            
                            if (deletePromises.length > 0) {
                                await Promise.all(deletePromises);
                                
                                // 更新本地状态
                this.messages = [];
                historyContainer.innerHTML = '';
                modal.style.display = 'none';
                                
                                // 移除角色显示
                                if (this.element && this.element.parentNode) {
                                    this.element.remove();
                                }
                                Character.characters.delete(this.senderId);
                            } else {
                                throw new Error('没有找到可删除的消息');
                            }
                        }
                    } catch (error) {
                        console.error('清空失败:', error);
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

// 添加菜单栏控制
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

// 初始状态设置为显示
menuBar.classList.remove('hidden');

// 3秒后自动隐藏
setTimeout(() => {
    menuBar.classList.add('hidden');
}, 2000); 