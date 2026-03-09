import React from 'react'
import Button from './buttons/Button'
import { questionsData } from '../data/questions'
import he from 'he';

export default function Questions(props) {
    const [questions, setQuestions] = React.useState(() =>
        questionsData.map(q => ({
            ...q,
            answers: [
                ...q.incorrect_answers,
                q.correct_answer
            ].sort(() => Math.random() - 0.5)
        }))
    )
    
    const [userAnswers, setUserAnswers] = React.useState({})
        const btnClassName = "default lg"
        const btnPlayValue = "Play again"
        const btnCheckAnswersValue = "Check answers"

    const [checked, setChecked] = React.useState(false)

    const score = questions.reduce((total, question) => {
        if (userAnswers[question.question] === question.correct_answer) {
            return total + 1
        }
        return total
    }, 0)

    const generateQuestions = questions.map((question, qIndex) => {
        return (
            <div className='question' key={qIndex}>
                <h3>{he.decode(question.question)}</h3>
            
                <div className="answers">
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
                            onClick={() => !checked && saveUserAnswers(question.question, answer)}
                        >
                            <input
                                type="radio"
                                name={`question-${qIndex}`}
                                value={answer}
                                disabled={checked}
                            />

                            {he.decode(answer)}
                        </label>
                    ))}
                </div>

                <hr/>
            </div>
        )
    })

    function saveUserAnswers(question, answer) {
        setUserAnswers(prev => ({
            ...prev,
            [question]: answer
        }))
    }

    const allAnswered = Object.keys(userAnswers).length === questions.length

    function test() {
        setChecked(true)
    }

    return (
        <section className='questions'>
            <div className='questions-wrapper'>
                {generateQuestions}
            </div>

            {!checked ?
                <Button 
                    clickHandler={test} 
                    className={btnClassName} 
                    value={btnCheckAnswersValue}
                    disabled={allAnswered ? null : 'disabled'} 
                />
            :   
                <>
                    <div className='score-wrapper'>
                        {checked && (
                        <h3 className="score">
                            You scored {score}/{questions.length} correct answers
                        </h3>
                        )}
                        <Button 
                            clickHandler={props.onPrev} 
                            className={btnClassName} 
                            value={btnPlayValue} 
                        />
                    </div>
                </>
            }
        </section>
    )
}