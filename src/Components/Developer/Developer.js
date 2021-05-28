import React from 'react';
import CardView from './../CardView/CardView';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import siri from './../../images/siri.jpeg';
import rakshitha from './../../images/rakshitha.jpeg';
import rashmi from './../../images/rashmi.jpeg';
import subramanya from './../../images/subramanya.jpg';
import thejaswini from './../../images/thejaswini.jpeg';
import vishnu from './../../images/vishnu.jpeg';
import vishwak from './../../images/vishwak.jpeg';
import yashwanth from './../../images/yashwanth.jpeg';
import './Developer.scss';

export default function Developer() {
    const developers = [
        { name: "A M Siri", photo: siri, gitLink: "https://github.com/Siriayanur", linkedinLink: "https://linkedin.com/in/a-m-siri-544a19190/" },
        { name: "Rakshitha H N", photo: rakshitha, gitLink: "https://github.com/rakshithhn99", linkedinLink: "https://linkedin.com/in/rakshitha-h-n-a1473b195" },
        { name: "Rashmi K R", photo: rashmi, gitLink: "https://github.com/rashmiullura", linkedinLink: "https://linkedin.com/in/rashmi-kr-050820" },
        { name: "Subramanya G", photo: subramanya, gitLink: "https://github.com/subramanya9112", linkedinLink: "https://linkedin.com/in/subramanya-g-774400185/" },
        { name: "Thejaswini Y R", photo: thejaswini, gitLink: "https://github.com/Thejaswini-y-r", linkedinLink: "https://linkedin.com/in/thejaswini-y-r-0105691aa" },
        { name: "Vishnu Teja S", photo: vishnu, gitLink: "https://github.com/vishnuteja2424", linkedinLink: "https://linkedin.com/in/vishnu-teja-s-702455192/" },
        { name: "Vishwak Vemuru", photo: vishwak, gitLink: "https://github.com/vishwakptlg39", linkedinLink: "https://linkedin.com/in/vishwak-vemuru-20b7361a2" },
        { name: "Yashwanth K", photo: yashwanth, gitLink: "https://github.com/YashwanthK20", linkedinLink: "https://linkedin.com/in/yashwanth-k-a384b7185" },
    ];

    return (
        <div className="developer">
            {developers.map(item => {
                return (<CardView
                    key={item.name}
                    front={
                        <div className="front">
                            <img src={item.photo} className="image" alt={item.name} />
                            <div className="name">
                                {item.name}
                            </div>
                        </div>
                    }
                    back={< div className="links" >
                        <GitHubIcon className="link" onClick={(e) => {
                            e.preventDefault();
                            window.require("electron").shell.openExternal(item.gitLink);
                        }} />
                        <LinkedInIcon className="link" onClick={(e) => {
                            e.preventDefault();
                            window.require("electron").shell.openExternal(item.linkedinLink);
                        }} />
                    </div >}
                />);
            })}
        </div >
    )
}
