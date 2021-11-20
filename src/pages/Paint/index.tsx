import { FC } from 'react';
import './index.css';

import PaintBoard from '../../components/PaintBoard';
import PaintTool from '../../components/PaintTool';

const Paint: FC = () => {
  return (
    <div className='paint-container'>
      <PaintBoard />
      <PaintTool />
    </div>
  );
};

export default Paint;
