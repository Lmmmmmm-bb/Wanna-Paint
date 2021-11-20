import { FC, useState, useRef, MouseEvent } from 'react';
import './index.css';

import { IPoint } from '../../models/Point.model';

const width = window.innerWidth;
const height = window.innerHeight;

const PaintBoard: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [startPoint, setStartPoint] = useState<IPoint>({ x: 0, y: 0 });

  const handleCanvasMouseDown = (e: MouseEvent) => {
    if (canvasRef.current) {
      setIsPainting(true);
      setStartPoint(getRatioPoint({ x: e.pageX, y: e.pageY }));
    }
  };

  const handleCanvasMouseMove = (e: MouseEvent) => {
    if (isPainting && canvasRef.current) {
      const endPoint: IPoint = getRatioPoint({ x: e.pageX, y: e.pageY });
      drawLine(startPoint, endPoint);
      setStartPoint(endPoint);
    }
  };

  const drawLine = (startPoint: IPoint, endPoint: IPoint) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx!.lineJoin = 'round';
      ctx!.lineCap = 'round';
      ctx!.lineWidth = 10;
      ctx?.beginPath();
      ctx?.moveTo(startPoint.x, startPoint.y);
      ctx?.lineTo(endPoint.x, endPoint.y);
      ctx?.stroke();
      ctx?.closePath();
    }
  };

  const getRatioPoint = (point: IPoint, ratio = 4) => {
    return {
      x: point.x * ratio,
      y: point.y * ratio
    };
  };

  return (
    <div className='paintboard-container'>
      <canvas
        className='paintboard-canvas'
        ref={canvasRef}
        width={width * 4}
        height={height * 4}
        style={{ width, height }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={() => setIsPainting(false)}
        onMouseLeave={() => setIsPainting(false)}
      >
        当前浏览器不支持画布，请更新或更换浏览器重试。
      </canvas>
    </div>
  );
};

export default PaintBoard;
