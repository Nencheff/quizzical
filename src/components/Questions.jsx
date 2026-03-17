import React from 'react'
import Button from './buttons/Button'
import he from 'he'

export default function Questions(props) {
    const [questions, setQuestions] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                if (!data.results) return
                setQuestions(
                    data.results.map(q => ({
                        ...q,
                        answers: [
                            ...q.incorrect_answers,
                            q.correct_answer
                        ].sort(() => Math.random() - 0.5)
                    }))
                )
            })
    }, [])


    const [userAnswers, setUserAnswers] = React.useState({})
    const [checked, setChecked] = React.useState(false)

    if (!questions.length) {
        return <p>Loading...</p>
    }

    const btnClassName = "default lg"
    const btnPlayValue = "Play again"
    const btnCheckAnswersValue = "Check answers"

    function saveUserAnswers(question, answer) {
        setUserAnswers(prev => ({
            ...prev,
            [question]: answer
        }))
    }

    const score = questions.reduce((total, question) => {
        if (userAnswers[question.question] === question.correct_answer) {
            return total + 1
        }
        return total
    }, 0)

    const allAnswered = Object.keys(userAnswers).length === questions.length

    const generateQuestions = questions.map((question, qIndex) => (
        <div className='question' key={qIndex}>
            <h3 id={`question-${qIndex}`}>{he.decode(question.question)}</h3>
            <div
                className="answers"
                role="radiogroup"
                aria-labelledby={`question-${qIndex}`}
            >
                {question.answers.map((answer, aIndex) => (
                    <label
                        key={aIndex}
                        className={`default ${
                            checked
                                ? answer === question.correct_answer
                                    ? "correct"
                                    : userAnswers[question.question] === answer
                                    ? "wrong"
                                    : "disabled"
                                : ""
                        }`}
                    >
                        <input
                            type="radio"
                            name={`question-${qIndex}`}
                            value={answer}
                            checked={userAnswers[question.question] === answer}
                            onChange={() => saveUserAnswers(question.question, answer)}
                            disabled={checked}
                        />
                        {he.decode(answer)}
                    </label>
                ))}
            </div>
            <hr/>
        </div>
    ))

    function checkAnswers() {
        setChecked(true)
    }

    return (
        <section className='questions'>
            <div className='questions-wrapper'>
                {generateQuestions}
            </div>

            {!checked ? (
                <Button
                    clickHandler={checkAnswers}
                    className={btnClassName}
                    value={btnCheckAnswersValue}
                    disabled={!allAnswered}
                    aria-disabled={!allAnswered}
                />
            ) : (
                <div className='score-wrapper'>
                    <h3 className="score" role="status" aria-live="polite">
                        You scored {score}/{questions.length} correct answers
                    </h3>
                    <Button
                        clickHandler={props.onPrev}
                        className={btnClassName}
                        value={btnPlayValue}
                    />
                </div>
            )}
        </section>
    )
}