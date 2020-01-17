const array = [
    'http://attachments.gfan.com/forum/attachments2/201301/29/125722eh9nj87bq20eq2e8.jpg',
    '2wer',
    'https://csdnimg.cn/cdn/content-toolbar/csdn-logo_.png',
    'http://attach.bbs.miui.com/forum/201304/25/195151szk8umd8or8fmfa5.jpg',
    'http://www.internetke.com/jsEffects/2014101006/mp3/The%20Dawn.mp3',
]

const images = {
    data: []
}
const audios = JSON.parse(JSON.stringify(images))

let total = null
let progress = 0
const isImg = /\.(png|jpg|gif)$/
const isAudio = /\.(mp3|wav|ogg)$/

array.forEach((item) => {
    if (typeof item !== 'string') return
    if (isImg.test(item)) images.data.push(item)
    if (isAudio.test(item)) audios.data.push(item)
})

images.length = images.data.length
audios.length = audios.data.length
total = images.length + audios.length

images.data.forEach((url) => {
    const img = new Image()
    img.src = url
    img.onload = response
})

audios.data.forEach((url) => {
    const audio = new Audio()
    audio.src = url
    audio.onloadedmetadata = response
})

let num = 0
let time = null

function clearTime(){
    clearInterval(time)
    time = null
}

function response() {
    progress++
    const node = Math.ceil(progress / total * 100)
    if (progress === total) {
        clearTime()
        success(node)
    } else {
        if (time) clearTime()
        time = setInterval(() => {
            if (num !== node) {
                num++
                success(num)
            } else {
                clearTime()
            }
        }, 100)
    }
}

function success(i){
    document.getElementById('nums').innerHTML = i
    if(i === '100'){
        const audio = new Audio()
        audio.src = 'http://www.internetke.com/jsEffects/2014101006/mp3/The%20Dawn.mp3'
        audio.play()
    }
}