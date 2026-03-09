import React from 'react'
import StartQuizz from './StartQuizz'
import Questions from './Questions'

export default function Main() {
    const [step, setStep] = React.useState(1)
    const [quizKey, setQuizKey] = React.useState(0)

    return (
        <main>
            {step === 1 && <StartQuizz onNext={() => setStep(2)} />}
            {step === 2 && (
                <Questions
                    key={quizKey}
                    onPrev={() => {
                        setStep(1)
                        setQuizKey(prev => prev + 1)
                    }}
                />
            )}
        </main>
    )
}