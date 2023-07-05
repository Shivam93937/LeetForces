import React,{useState} from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import EditorFooter from './EditorFooter';
import { Problem } from '@/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { problems } from '@/utils/problems';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

type PlayGroundProps = {
    problem:Problem;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
    setSolved: React.Dispatch<React.SetStateAction<boolean>>

};

const PlayGround:React.FC<PlayGroundProps> = ({problem, setSuccess, setSolved}) => {
    const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
    const [userCode, setUserCode] = useState<string>(problem.starterCode);
    const [user] = useAuthState(auth);
    const {query:{pid}} = useRouter();
    const handleSubmit = async ()=>{
        if(!user){
            toast.error("Please log-in to submit your code",{position:"top-center", autoClose:3000, theme:"dark"});
            return;
        }

        try {
            const cb=new Function (`return ${userCode}`)();
            const success = problems[pid as string].handlerFunction(cb); 
            if(success){
                toast.success("Test-Cases Passed",{
                    position:"top-center",
                    autoClose:3000,
                    theme:"dark"
                })
                setSuccess(true); 
                setSolved(true);
                setTimeout(()=>{
                    setSuccess(false);
                },3000)
                const userRef = doc(firestore,"users",user.uid);
                await updateDoc(userRef,{
                    solvedProblems:arrayUnion(pid),
                })
            }
        } 
        catch (error:any) {
            if(error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"))
                toast.error("Oops! One or more Test Cases Failed!",{position:"top-center",autoClose:3000,theme:"dark"});
            else{
                toast.error(error.message,{position:"top-center",autoClose:3000,theme:"dark"});
            }
            console.log(error);
        }
    }
    const onChange = (value:string)=>{
        setUserCode(value)
    }
    return (
        <>
        <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
        <PreferenceNav/>
        <Split className='h-[calc(100vh-94px)]' direction='vertical'sizes={[60,40]} minSize={60}>
            <div className='w-full overflow-auto'>
                <CodeMirror
                    value={problem.starterCode}
                    theme={vscodeDark}
                    extensions={[javascript(),cpp()]}
                    style={{fontSize:16}}
                    onChange={onChange}
                />
            </div>
        <div className='w-full px-5 overflow-auto '>
            <div className='flex items-center h-10 space-x-6'>
                <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                    <div className='text-sm font-medium leading-5 text-white'>Test Cases</div>
                    <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white'/>
                </div>
            </div>

            <div className="flex">
                {/* case-1 */}
                {problem.examples.map((example,ind)=>(
                    <div className='mr-2 items-start mt-2 text-white' key={example.id} onClick={()=>{
                        setActiveTestCaseId(ind)
                    }}>
                    <div className='flex flex-wrap items-center gap-y-4'>
                        <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2
                        relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${activeTestCaseId !== ind ? "text-gray-500": ""}`}> Case {ind+1}</div>
                    </div>
                </div>
                ))}
                
            </div>


                <div className='font-semibold'>
                    <p className='text-sm font-medium mt-4 text-white'>Input:</p>
                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                        {problem.examples[activeTestCaseId].inputText}
                    </div>

                    <p className='text-sm font-medium mt-4 text-white'>Output:</p>
                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                        {problem.examples[activeTestCaseId].outputText}
                    </div>
                </div>
                <br></br> <br></br>

        </div>
        </Split>
        <EditorFooter handleSubmit = {handleSubmit}/>
        </div>
        </>
    )
}
export default PlayGround;