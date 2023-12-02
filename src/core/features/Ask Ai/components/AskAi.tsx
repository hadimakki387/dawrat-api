import AskAiHeader from './AskAiHeader'
import QuestionInput from './QuestionInput'

function AskAi() {
  return (
    <div className='flex flex-col gap-8'>
      <AskAiHeader/>
      <QuestionInput/>
    </div>
  )
}

export default AskAi