import './App.css'
import FlagQuiz from '../FlagQuiz';
import {LanguageProvider} from "../../context/LanguageContext.tsx";
import githubLogoWhite from '../../assets/github-mark-white.svg'

export default function App() {
    return (
        <LanguageProvider>
            <main>
                <h1 className="text-center">Flagle</h1>
                <div id="flagle-card" className="card text-center">
                    <div className="card-body">
                        <FlagQuiz rows={2} cols={3}/>
                    </div>
                </div>
            </main>
            <footer className="bg-dark-subtle p-3 px-sm-5">
                <div className="d-flex flex-wrap justify-content-between align-items-center p-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <span className="text-muted">Stanisław Ladorucki 2024</span>
                    </div>

                    <div className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="nav-item">
                            <a href="https://github.com/stanislaw-ladorucki/flagle" title="Github Repository"
                               className="ms-auto">
                                <img src={githubLogoWhite} alt="Github" width="30"/>
                            </a>
                        </li>
                    </div>
                </div>
            </footer>
        </LanguageProvider>
    )
}
