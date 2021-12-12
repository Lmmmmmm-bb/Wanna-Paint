import { FC, useRef } from 'react';
import './index.css';

import PaintBoard from '../../components/PaintBoard';
import PaintTool from '../../components/PaintTool';

const Paint: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className='paint-container'>
      <PaintBoard canvasRef={canvasRef} />
      <PaintTool canvasRef={canvasRef} />
    </div>
  );
};

export default Paint;
