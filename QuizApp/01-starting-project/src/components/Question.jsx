import QuestionTimer from './questionTimer.jsx'
import Answers from './Answers.jsx';
import { useState } from 'react';
import questions from '../questions';


export default function Question ({
     index,
     onSkipAnswer, 
     onSelectAnswer}){
    const [answer , setAnswer]=useState({
        selectedAnswer: '',
        isCorrect: null
    });
    let timer =10000
    if (answer.selectedAnswer){
        timer= 1000;
    }
    if (answer.isCorrect!== null){
        timer= 2000;
    }
    function handleSelectAnswer(answer){
        setAnswer({
            selectedAnswer: answer,
            isCorrect:null
        })
        setTimeout(() => {
            setAnswer({
                selectedAnswer:answer,
                isCorrect: questions[index].answers[0] === answer
            })
            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }
    let answerState='';
    if(answer.selectedAnswer && answer.isCorrect!==null){
        answerState= answer.isCorrect ? "correct": "wrong";
    }else if(answer.selectedAnswer){
        answerState="answered"
    }
    return(
        <div id='question'>
        <QuestionTimer timeOut={timer} 
        onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer: ()=>null} 
        mode={answerState} 
        key={timer} />
        <h2>{questions[index].text}</h2>
        <Answers 
        answers={questions[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
        />
        </div>
        
    );
}