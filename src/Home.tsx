import EnterSentence from "./EnterSentence";
import './Home.css'
import { useNavigate } from 'react-router-dom';

interface FormElements extends HTMLFormControlsCollection {
    sentence: HTMLInputElement
}

interface FormElement extends HTMLFormElement {
    readonly elements: FormElements
}

function Home() {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<FormElement>) => {
        event.preventDefault();
        navigate('/generate', { state: { sentence: event.currentTarget.elements.sentence.value } });
    }

    return (
        <div className="container">
            <div className="header-container">
                <EnterSentence />
            </div>
            <form className="sentence-container" onSubmit={handleSubmit}>
                <input className="sentence" id="sentence" type="text" />
            </form>
        </div>
    );
}

export default Home;
