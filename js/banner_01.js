class Banner {
  constructor(bannerCon) {
    this.index = 0
    this.bannerCon = bannerCon
    this.items = this.bannerCon.getElementsByClassName('item')
    this.iconsWrp = this.bannerCon.getElementsByClassName('icons')[0]
    this.icons = null
    this.prevBtn = document.getElementById('prevBtn')
    this.nextBtn = document.getElementById('nextBtn')
    this.len = this.items.length
    this.interval = null
    this.timeout = null

    this.init()
  }

  makeIcon() {
    for (let i = 0; i < this.len; i++) {
      let icon = document.createElement('i')
      icon.className = 'icon'
      this.iconsWrp.append(icon)
    }
  }

  showNow(index) {
    let currItem = this.items[index]
    let currImg = currItem.getElementsByTagName('img')[0]
    let src = currImg.src
    let icons = this.icons ? this.icons : this.iconsWrp.getElementsByTagName('i')
    let currIcon = icons[index]

    if (!src) {
      currImg.src = currImg.dataset.src
    }

    for (let i = 0; i < this.len; i++) {
      let item = this.items[i]
      let icon = icons[i]
      if (item !== currItem) {
        item.className = 'item'
        icon.className = 'icon'
      } else {
        currItem.className = 'item now'
        currIcon.className = 'icon now'
      }
    }
  }

  loopShow() {
    let self = this
    clearInterval(this.interval)
    this.interval = setInterval(function () {
      if (++ self.index > self.len - 1) {
        self.index = 0
      }
      self.showNow(self.index)
    }, 3000)
  }

  initIconEvent() {
    let self = this
    let icons = this.icons ? this.icons : this.iconsWrp.getElementsByTagName('i')
    this.iconsWrp.addEventListener('mouseover', function (e) {
      e.stopPropagation()
      let target = e.target
      self.index = Array.prototype.indexOf.call(icons, target)
      if (target.nodeName === 'I') {
        clearInterval(self.interval)
        self.showNow(self.index)
      }
    })
    this.iconsWrp.addEventListener('mouseout', function () {
      self.loopShow()
    })
  }

  initBtnEvent() {
    let self = this
    this.prevBtn.addEventListener('click', function (e) {
      e.stopPropagation()
      if (-- self.index < 0) {
        self.index = self.len - 1
      }
      self.reShow()
    })
    this.nextBtn.addEventListener('click', function (e) {
      e.stopPropagation()
      if (++ self.index >= self.len) {
        self.index = 0
      }
      self.reShow()
    })
  }

  reShow() {
    let self = this
    clearTimeout(self.timeout)
    self.showNow(self.index)
    self.timeout = setTimeout(function () {
      self.loopShow()
    }, 3000)
  }

  init() {
    this.makeIcon()
    this.showNow(this.index)
    this.loopShow()
    this.initIconEvent()
    this.initBtnEvent()
  }
}