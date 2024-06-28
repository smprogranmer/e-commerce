import React from 'react'
import './footer.css'
const Footer = () => {
  return <>
   <footer>
        <div className="container footer__container">
            <div className="footer_1">
                <a href="" className="logo"></a>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, animi.</p>
                <div className="input">
                    <input type="email" name="" placeholder='asyr@gmail.com' id="" />
                </div>
            </div>
            <div className="footer_2">
                <h4>menus</h4>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">about</a></li>
                    <li><a href="">contact</a></li>
                    <li><a href="">login</a></li>
                    <li><a href="">sing up</a></li>
                </ul>
            </div>
            <div className="footer_3">
                <h4>primary</h4>
                <ul>
                    <li><a href="">privace</a></li>
                    <li><a href="">terms and condition</a></li>
                    <li><a href="">return police </a></li>
                </ul>
            </div>
            <div className="footer_4">
                <h4>contact us</h4>

                <ul>
                    <li><a href="">01525664646</a></li>
                    <li><a href="">abc@gmail.com</a></li>
                </ul>
                <div className="icons">
                </div>
            </div>


        </div>
        <div className="copyright">
            <p>copyright@siyamahmed</p>
        </div>
    </footer>
  </>
}

export default Footer