import React from "react";

function Footer() {

    let curYear = new Date().getFullYear();

    return (
        <div>
            <footer>
                <p>
                    Copyright {String.fromCodePoint(0x00A9)} Oscarqjh {curYear}
                </p>
            </footer>
        </div>
    );
}

export default Footer;