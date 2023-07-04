import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import PlayGround from './PlayGround/PlayGround';
import { Problem } from '@/utils/types/problem';

type WorkspaceProps = {
    problem:Problem
};

const Workspace:React.FC<WorkspaceProps> = ({problem}) => {
    
    return <Split className='split' minSize={0}>
        <ProblemDescription problem={problem}/>
        <PlayGround problem={problem}/>
    </Split>
}
export default Workspace;