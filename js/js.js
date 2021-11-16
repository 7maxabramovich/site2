class modal{
  constructor(props){
    let defaultConfig = {
      backscroll: true,
      linkAttributeName: 'data-modal',
      closeOnOverlay: false,
      closeOnEsc: false,
      closeOnButton: true,
    };
    this.config = Object.assign(defaultConfig, props);
  if(!modal._shadow){
    modal._shadow = document.createElement('button');
    modal._shadow.classList.add('modal-shadow');
    document.body.appendChild(modal._shadow);
  }
  this.eventsFeeler();
  }

  eventsFeeler(){
    document.addEventListener('click', function (e) {
      const clickedlink = e.target.closest('[' + this.config.linkAttributeName + ']');
      if (clickedlink) {
        e.preventDefault();
        this.starter = clickedlink;
        let targetSelector = this.starter.getAttribute(this.config.linkAttributeName);
        this._nextWindows = document.querySelector(targetSelector);
        this.open();
        return;
      }
      if (this.config.closeOnButton && e.target.closest('[data-close]')) {
        this.close();
        return;
      }
    }.bind(this));

    if (this.config.closeOnOverlay) {
      document.addEventListener('mousedown', function (e) {
        if (!e.target.classList.contains('modal-wrap')) return;
        this._overlayChecker = true;
      }.bind(this));

      document.addEventListener('mouseup', function (e) {
        if (this._overlayChecker && e.target.classList.contains('modal-wrap')) {
          e.preventDefault();
          !this._overlayChecker;
          this.close();
          return;
        }
        this._overlayChecker = false;
      }.bind(this));
    }

    window.addEventListener('keydown', function (e) {
      if (this.config.closeOnEsc && e.which == 27 && this.isOpened) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));
  }

  open(){
    this.openedWindow = this._nextWindows;
    this._modalBlock = this.openedWindow.querySelector('.modal-window');
    this._bodyScrollControl();
    modal._shadow.classList.add('modal-shadowShow');
    this.openedWindow.classList.add('modal-active');
    this.isOpened = true;
  }

  close(){
    if (!this.isOpened) {
      return;
    }
    this.openedWindow.classList.remove('modal-active');
    modal._shadow.classList.remove('modal-shadowShow');
    this._bodyScrollControl();
    this.isOpened = false;
  }
 
  _bodyScrollControl(){
    if(!this.config.backscroll) return;

    let html = document.documentElement;
    if (this.isOpened === true) {
      html.classList.remove('modal-opened');
      html.style.marginRight = '';
      window.scrollTo(0, this._scrollPosition);
      html.style.top = '';
      return;
    }
    this._scrollPosition = window.pageYOffset;
    let marginSize = window.innerWidth - html.clientWidth;
    html.style.top = -this._scrollPosition + 'px';

    if (marginSize) {
      html.style.marginRight = marginSize + 'px';
    }
    html.classList.add('modal-opened');
  }
}

const myModal = new modal({
  closeOnOverlay: true,
  closeOnEsc: true,
});


let modalHref = document.querySelectorAll('a[data-modal="#open-modal"]');
for (let i = 0; i < modalHref.length; i++) {
  modalHref[i].addEventListener('click', function(e) {
    let modalSrc = e.target.getAttribute('src');

    let modalImg = document.querySelector('.modal-img');

    let = modalImg.setAttribute('src', modalSrc);
    let = modalImg.setAttribute('alt', modalSrc);
  });
}