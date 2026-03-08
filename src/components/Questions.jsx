import React from 'react'
import Button from './buttons/Button'
import { questionsData } from '../data/questions'
import he from 'he';

export default function Questions(props) {
    const [questions, setQuestions] = React.useState(questionsData)

        const btnClassName = "default xl"
        const btnValue = "Play again"

        // React.useEffect(() => {
        // fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        //     .then(res => res.json())
        //     .then(data => setQuestionsData(data))
        // }, [])

    const generateQuestions = questions.map((question, qIndex) => {
        const answers = [
            ...question.incorrect_answers,
            question.correct_answer
        ].sort(() => Math.random() - 0.5)

        return (
            <div className='question' key={qIndex}>
                <h3>{he.decode(question.question)}</h3>
               
                <div className="answers">
                    {answers.map((answer, aIndex) => (
                        <label key={aIndex} className='default'>
                            <input
                                type="radio"
                                name={`question-${qIndex}`}
                                value={answer}
                            />

                            {he.decode(answer)}
                        </label>
                    ))}
                </div>

                <hr/>
            </div>
        )
    })

    return (
        <section className='questions'>
            <div className='questions-wrapper'>
                {generateQuestions}
            </div>
            <Button 
                clickHandler={props.onPrev} 
                className={btnClassName} 
                value={btnValue} 
            />
        </section>
    )
}