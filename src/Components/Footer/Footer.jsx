import React from 'react'
import './FT.css';

var Footer = () => {

    return (
        <>
            <footer>
                <ul>
                    <li>social connection</li>
                    <li><i className="fab fa-facebook"></i>Facebook</li>
                    <li><i className="fab fa-instagram-square"></i>Instagram</li>
                    <li><i className="fab fa-twitter-square"></i>Twitter</li>
                    <li><i className="fab fa-youtube"></i>Youtube</li>
                </ul>
                <ul>
                    <li>Project</li>
                    <li><i className="fab fa-github"></i>Github repo.</li>
                    <li><i className="fab fa-uncharted"></i>Old version</li>
                    <li><i className="fas fa-code"></i>Api Service</li>
                </ul>
                <ul>
                    <li>support</li>
                    <li><i className="fab fa-searchengin"></i>Troubleshooting</li>
                    <li><i className="fas fa-question-circle"></i>Common Questions</li>
                    <li><i className="fas fa-bug"></i>Report a Bug</li>
                    <li><i className="fas fa-hands-helping"></i>Get Help</li>
                </ul>

                <div className="f_sub_main">
                    <p>Made with  &  in Bentonville, Boston, Joplin, Seattle, and Vergennes.</p>
                    <p>Terms + privacy</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;