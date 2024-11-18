import {FormEvent, useContext, useState} from "react";
import {LanguageContext} from "../../context/LanguageContext.tsx";
import Country from "../../constants/country.ts";
import Flag from "../Flag";

interface IAnswer {
    key: string;
    name: string;
    isCorrect: boolean;
}

export default function FlagQuiz(props: { solution?: Country; rows: number, cols: number }) {
    function getRandomCountry(): Country {
        const countryCodes = Object.values(Country);
        return countryCodes[Math.floor(Math.random() * countryCodes.length)];
    }

    const {language} = useContext(LanguageContext);
    const [solution, setSolution] = useState<Country>(() => props.solution || getRandomCountry());
    const [history, setHistory] = useState<IAnswer[]>([]);

    const countryNames = new Intl.DisplayNames([language], {type: 'region', fallback: 'code'});

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const answer = formData.get('answer') as string;

        if (getIsFinished() || !answer)
            return;

        setHistory([...history, {
            key: answer,
            name: countryNames.of(answer)!,
            isCorrect: answer == solution,
        }]);

        if (getIsSolved()) {
            alert('Success!')
        }
        if (getIsFailed()) {
            alert(`The correct answer was ${countryNames.of(solution)}`)
        }
    }

    function restart() {
        setSolution(getRandomCountry())
        setHistory([])
    }

    function getAttemptsCount(): number {
        return history.length;
    }

    function getAttemptsAllowedCount(): number {
        return props.rows * props.cols;
    }

    function getIsSolved(): boolean {
        return history.some(answer => answer.key == solution)
    }

    function getIsFailed(): boolean {
        return getAttemptsAllowedCount() <= getAttemptsCount()
    }

    function getIsFinished(): boolean {
        return getIsSolved() || getIsFailed()
    }

    return <>
        <Flag country={solution} rows={props.rows} cols={props.cols}/>
        <form onSubmit={handleSubmit}>
            <fieldset className="mb-3">
                <legend className="h5">Guess the Country ({getAttemptsCount()}/{getAttemptsAllowedCount()})</legend>
                {!getIsFinished() ?
                    <QuizAnswerInput options={Object.values(Country).map(country => ({value: country, name: countryNames.of(country)!}))}/> :
                    <button onClick={restart} name="replay" className="btn btn-primary w-100">Play Again ↻</button>
                }
            </fieldset>
            <QuizAnswerHistory answers={history}/>
        </form>
    </>
}

export function QuizAnswerInput(props: { options: { value: string; name: string }[]}) {
    return <div className="input-group mb-3">
        <select id="answer" name="answer" className="form-select">
            <option value=""/>
            {props.options.map(({value, name}) => (
                <option key={value} value={value}>{name}</option>
            ))}
        </select>
        <input type="submit" name="submit" className="btn btn-success"/>
    </div>
}

export function QuizAnswerHistory({answers}: { answers: IAnswer[] }) {
    return <div className="container">{
        answers.map(answer => <QuizAnswerHistoryItem answer={answer}/>)
    }</div>
}

export function QuizAnswerHistoryItem({answer}: { answer: IAnswer }) {
    return <div className={`row ${answer.isCorrect ? 'bg-success' : 'bg-secondary'} rounded p-2 mb-1`} key={answer.key}>
        <span className="col w-100">{answer.name}</span>
        <span className="col-auto">{answer.isCorrect ? '🟩' : '🟥'}</span>
    </div>
}