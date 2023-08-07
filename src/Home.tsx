import EnterSentence from "./EnterSentence";
import './Home.css'

function Home() {
    return (
        <div className="container">
            <div className="header-container">
                <EnterSentence />
            </div>
            <input className="sentence"/>
        </div>
    );
}

export default Home;
