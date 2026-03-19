import Button from './buttons/Button'

export default function StartQuizz(props) {
    const btnClassName = "default xl"
    const btnValue = "Start quiz"

    return (
        <>
            <div className='start-page'>
                <h1>Quizzical</h1>
                <h2>Scrimba app</h2>

                <Button
                    clickHandler={props.onNext}
                    className={btnClassName}
                >
                    {btnValue}
                </Button>
            </div>

        </>
    )
}