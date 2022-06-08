
// Create a class for the element
class CookiePopover extends HTMLElement {

  // Style Html Elelments --------------------------------------------------
  overlay_style = `position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9;
  background-color: rgba(0,0,0,0.34);`;

  msgbox_style = `padding: 30px 130px;
  height: auto;
  display: flex;
  align-items: center;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 0 18px 0 rgb(227 227 227 / 50%);
  background-color: #fcfbf7;
  width: auto;
  height: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 12;
  gap: 10px;`;

  msgbox_p_style = `color: #212121;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  line-height: 24px;
  font-family: Lato,sans-serif;
  text-align: left;`;

  msgbox_a_style = `"text-transform: capitalize;
  font-size: 16px;
  font-weight: 400;
  width: 129px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  background: #00b1cd;
  color: #fff;
  line-height: 40px;
  font-family: "Lato",sans-serif;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  text-transform: uppercase;
  text-decoration: none;"`;
  //--------------------------------------------------------------

   overlay_div;
   msgbox_div;
   pTag_text;
   tag_attrs = ['coo-name', 'coo-value', 'coo-days']; // name attribute must be at 0 index
   mediaQuery = window.matchMedia("(max-width: 767px)")

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    var shadow = this.attachShadow({ mode: 'open' });

    this.overlay_div = document.createElement('div');
    this.msgbox_div = document.createElement('div');
    this.pTag_text = document.createElement('p');

    const [action_div, aTag_btn ] = ['div','a'].map((ele) => document.createElement(ele));

    this.overlay_div.setAttribute('style', this.overlay_style);
    this.msgbox_div.setAttribute('style', this.msgbox_style);
    action_div.setAttribute('style', "margin: 15px 0;text-align: center;");

    aTag_btn.setAttribute('style', this.msgbox_a_style);
    this.pTag_text.setAttribute('style', this.msgbox_p_style);
    aTag_btn.href = "javascript:void(0);"
    aTag_btn.addEventListener('click', this.handleAcceptCookie.bind(this));
    aTag_btn.innerHTML = `<span>Accept &nbsp; <span>
    <svg width="17" height="11" viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#FFF" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1.5 5.498h13.998M10.97 1l4.53 4.5-4.53 4.5"/>
    </g> </svg> 
        </span>
    </span>`;


    action_div.appendChild(aTag_btn)

    this.pTag_text.innerHTML = `
        This website uses cookie or similar technologies, to enhance your browsing experience and provide
         personalized content. By continuing to use our website, you agree to our 
         <a href="https://www.hindustantimes.com/privacy-policy" style="color: #00b1cd;text-decoration: none;">Privacy Policy</a> 
         and <a href="javascript:void(0);" style="color: #00b1cd;text-decoration: none;">Cookie Policy</a>.`;

    this.msgbox_div.appendChild(this.pTag_text)
    this.msgbox_div.appendChild(action_div)

    // Add the image to the shadow root.
    shadow.appendChild(this.overlay_div);
    shadow.appendChild(this.msgbox_div);

    this.setPopoverVisiblity();
    this.mediaQuery.addEventListener('change', this.mediaQueryCustomView.bind(this))
  }


  handleAcceptCookie() {
    let [name,value,days] = this.tag_attrs.map((key)=> this.getAttribute(key));

    this.deleteCookie(name||='_ht_gdpr');
    this.setCookie(name||='_ht_gdpr', value||='1', days||=60);
    this.setPopoverVisiblity();
  }

  // Create cookie
  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  // Delete cookie
  deleteCookie(cname) {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
  }

  // Read cookie
  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = window.decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  setPopoverVisiblity(){
    const nameAttr = this.getAttribute(this.tag_attrs[0]) || "_ht_gdpr";
    const cookie_consent = this.getCookie(nameAttr);
     if(cookie_consent){
      this.overlay_div.remove();
      this.msgbox_div.remove();
     }       
  }

  mediaQueryCustomView(e){

     if(e.matches){

      this.msgbox_div.style.padding = "16px 12px"; 
      this.msgbox_div.style.display = "block";
      
      this.pTag_text.style.color= '#212121';
      this.pTag_text.style.fontSize= '14px';
      this.pTag_text.style.lineHeight= '24px';
      this.pTag_text.style.fontFamily= 'Lato,sans-serif';
      this.pTag_text.style.fontWeight= 'normal';
      this.pTag_text.style.textAlign= 'center';
      this.pTag_text.style.margin= 0;

     }else {
      this.msgbox_div.setAttribute('style', this.msgbox_style);
      this.pTag_text.setAttribute('style', this.msgbox_p_style);
     }
  }

}


// Define the new element
window.customElements.define('cookie-popover', CookiePopover);