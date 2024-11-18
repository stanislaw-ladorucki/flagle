import './App.css'
import FlagQuiz from '../FlagQuiz';
import {LanguageProvider} from "../../context/LanguageContext.tsx";


export default function App() {
    return (
        <LanguageProvider>
            <h1>Flagle</h1>
            <div id="flagle-card" className="card">
                <div className="card-body">
                    <FlagQuiz rows={2} cols={3}/>
                </div>
            </div>
        </LanguageProvider>
    )
}
